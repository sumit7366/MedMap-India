import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { askAI } from '../utils/ai';
import { HOSPITALS } from '../data';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Emergency state
  const [isEmergency, setIsEmergency] = useState(false);
  const [nearestHospital, setNearestHospital] = useState(null);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem('medmap_chat');
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    } else {
      setMessages([{ role: 'assistant', content: "Hi! I'm the MedMap Triage Assistant. How are you feeling today? You can describe your symptoms or ask about healthcare facilities." }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medmap_chat', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999999;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestCapable = (lat, lng) => {
    const capable = HOSPITALS.filter(h => 
      h.capabilities.some(c => c.toLowerCase().includes('icu') || c.toLowerCase().includes('trauma'))
    );
    
    if (capable.length === 0) return HOSPITALS[0];

    return capable.reduce((prev, curr) => {
      const distPrev = calculateDistance(lat, lng, prev.lat, prev.lng);
      const distCurr = calculateDistance(lat, lng, curr.lat, curr.lng);
      return distPrev < distCurr ? prev : curr;
    });
  };

  const handleEmergency = () => {
    setIsEmergency(true);
    setIsOpen(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const nearest = findNearestCapable(pos.coords.latitude, pos.coords.longitude);
          setNearestHospital(nearest);
          setMessages(prev => [...prev, 
            { role: 'user', content: 'EMERGENCY TRIGGERED' }, 
            { role: 'assistant', content: `🔴 **EMERGENCY PROTOCOL ACTIVATED**\n\nWe have detected your location. The nearest capable facility is **${nearest.name}** in ${nearest.city}. Please proceed there immediately.`}
          ]);
        },
        (err) => {
          console.error("Location error", err);
          const defaultNearest = HOSPITALS.filter(h => h.capabilities.some(c => c.toLowerCase().includes('icu')))[0];
          setNearestHospital(defaultNearest);
          setMessages(prev => [...prev, 
            { role: 'user', content: 'EMERGENCY TRIGGERED' }, 
            { role: 'assistant', content: "🔴 **EMERGENCY PROTOCOL ACTIVATED**\n\nLocation access was denied. Based on general availability, we recommend the following facility."}
          ]);
        }
      );
    }
  };

  const handleSend = async (queryOverride) => {
    const query = queryOverride || input;
    if (!query.trim() || isLoading) return;
    if (!queryOverride) setInput('');
    
    const newMsgs = [...messages, { role: 'user', content: query }];
    setMessages(newMsgs);
    setIsLoading(true);

    const response = await askAI(newMsgs);
    
    if (response.includes("🔴") || response.toLowerCase().includes("emergency")) {
      setIsEmergency(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const nearest = findNearestCapable(pos.coords.latitude, pos.coords.longitude);
          setNearestHospital(nearest);
        });
      }
    }

    setMessages([...newMsgs, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const parseOptions = (text) => {
    const regex = /\[OPTION:\s*(.*?)\]/g;
    const options = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      options.push(match[1]);
    }
    return options;
  };

  const cleanText = (text) => {
    return text.replace(/\[OPTION:\s*.*?\]/g, '').trim();
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="floating-actions" style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10000 }}>
        <button 
          onClick={handleEmergency}
          style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(255,71,87,0.4)', animation: 'pulse 2s infinite' }}
          title="Emergency"
        >
          <AlertTriangle size={24} />
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent)', color: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,212,255,0.3)' }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '90px', right: '20px', width: '350px', maxWidth: 'calc(100vw - 40px)', height: '500px', maxHeight: 'calc(100vh - 120px)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 9999, boxSizing: 'border-box' }}>
          
          <div style={{ background: isEmergency ? 'var(--red)' : 'var(--card)', padding: '15px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: isEmergency ? '#fff' : 'inherit' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEmergency ? <AlertTriangle size={18} /> : <MessageSquare size={18} />}
              {isEmergency ? 'Emergency Mode' : 'AI Health Assistant'}
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, i) => {
              const options = msg.role === 'assistant' ? parseOptions(msg.content) : [];
              const displayContent = msg.role === 'assistant' ? cleanText(msg.content) : msg.content;
              
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ background: msg.role === 'user' ? 'var(--accent)' : 'var(--card)', color: msg.role === 'user' ? '#fff' : 'inherit', padding: '10px 14px', borderRadius: '12px', borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px', borderBottomLeftRadius: msg.role === 'assistant' ? '2px' : '12px', fontSize: '0.85rem', lineHeight: 1.5, border: msg.role === 'user' ? 'none' : '1px solid var(--border)' }}
                    dangerouslySetInnerHTML={{ __html: displayContent.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' style='color:inherit;text-decoration:underline;'>$1</a>") }} />
                  
                  {options.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleSend(opt)}
                          style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '15px', padding: '5px 12px', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--text)' }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {isEmergency && nearestHospital && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '90%', background: 'rgba(255,71,87,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,71,87,0.3)' }}>
                <strong style={{ color: 'var(--red)', display: 'block', marginBottom: '8px' }}>Nearest Capable Facility:</strong>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{nearestHospital.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '8px' }}>📍 {nearestHospital.city}, {nearestHospital.state}</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={`tel:${nearestHospital.phone || '108'}`} style={{ background: 'var(--red)', color: '#fff', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14}/> Call Ambulance</a>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${nearestHospital.lat},${nearestHospital.lng}`} target="_blank" rel="noreferrer" style={{ background: 'var(--card2)', color: 'var(--text)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> Directions</a>
                </div>
              </div>
            )}

            {isLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--card)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem' }}>...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: '12px', borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '8px 14px', color: 'var(--text)', fontSize: '0.85rem' }}
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()} style={{ background: 'var(--accent)', color: '#000', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)', textAlign: 'center', marginTop: '6px' }}>Not a substitute for professional medical advice.</div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255,71,87,0.7); } 70% { box-shadow: 0 0 0 15px rgba(255,71,87,0); } 100% { box-shadow: 0 0 0 0 rgba(255,71,87,0); } }
      `}} />
    </>
  );
}

export default ChatbotWidget;
