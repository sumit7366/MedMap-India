import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { askAI } from '../utils/ai';

function stripOptions(text) {
  return text.replace(/\[OPTION:\s*.*?\]/g, '').trim();
}

function parseOptions(text) {
  const regex = /\[OPTION:\s*(.*?)\]/g;
  const options = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    options.push(match[1]);
  }
  return options;
}

function formatResponse(text) {
  let formatted = stripOptions(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' style='color:var(--accent);text-decoration:underline;'>$1</a>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*$)/gm, "<strong style='font-size:1rem;color:var(--accent)'>$1</strong>")
    .replace(/^## (.*$)/gm, "<strong style='font-size:1.05rem;color:var(--accent)'>$1</strong>")
    .replace(/^- (.*$)/gm, "<li>$1</li>")
    .replace(/🔴/g, "<span class='highlight-red'>🔴</span>")
    .replace(/🟢/g, "<span class='highlight-green'>🟢</span>")
    .replace(/🟡/g, "<span class='highlight-yellow'>🟡</span>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");

  return formatted;
}

function Agent() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Namaste! 🙏 I'm the **MedMap IDP Agent** — an AI system built to analyze Indian healthcare infrastructure and identify medical deserts.\n\nI have data on **15 facilities**, **10 doctors**, and **3 NGOs** across India. I can help you:\n- Identify medical deserts and capability gaps\n- Route patients to appropriate facilities\n- Match doctors to underserved regions\n- Analyze specialty coverage by region\n\nWhat would you like to explore?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryOverride) => {
    const query = queryOverride || input;
    if (!query.trim() || isLoading) return;

    setInput('');
    const newMsgs = [...messages, { role: 'user', content: query }];
    setMessages(newMsgs);
    setIsLoading(true);

    const response = await askAI(newMsgs);

    setMessages([...newMsgs, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const sampleQueries = [
    { q: 'Which districts in India are medical deserts with no ICU?', icon: '🚨' },
    { q: 'Which doctors are available for transfer to underserved regions?', icon: '🚀' },
    { q: 'Compare AIIMS Delhi vs CMC Vellore capabilities', icon: '⚖️' },
    { q: 'Which hospitals in Bihar and Odisha need urgent specialist support?', icon: '🆘' },
    { q: 'List all NGOs that operate in Eastern India and accept volunteers', icon: '🤝' },
    { q: 'What cardiology services are available in South India?', icon: '❤️' },
    { q: 'Which facilities lack basic equipment like X-Ray or CT scan?', icon: '⚠️' },
    { q: 'Suggest a routing plan for a cardiac patient in Malkangiri, Odisha', icon: '🗺️' }
  ];

  return (
    <div className="agent-layout" style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 2rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', flex: 1, minHeight: 0, boxSizing: 'border-box', width: '100%' }}>

      {/* Sidebar */}
      <div className="agent-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="sidebar-panel" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
          <div className="sidebar-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📋 Sample Queries</div>
          <div className="sample-q-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sampleQueries.map((item, idx) => (
              <div key={idx} className="sample-q" onClick={() => handleSend(item.q)} style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '9px 12px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text2)', transition: 'all 0.2s', lineHeight: 1.4 }}>
                {item.icon} {item.q}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-panel" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
          <div className="sidebar-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🤖 Agent Capabilities</div>
          <ul className="capabilities-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['📊 Facility capability extraction', '🔍 Medical desert detection', '🗺️ Patient routing logic', '👨‍⚕️ Doctor matching', '🤝 NGO coordination', '📋 Gap analysis reports', '⚖️ Multi-facility comparison', '📍 Region-based search'].map((cap, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text2)', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>{cap}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="agent-chat" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chat-header" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="chat-header-icon" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent2), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>⚕</div>
          <div>
            <div className="chat-header-title" style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>MedMap IDP Agent</div>
            <div className="chat-header-sub" style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Intelligent Document Parsing · Healthcare Intelligence</div>
          </div>
          <div className="agent-status" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--green)' }}>
            <div className="status-dot" style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%', animation: 'blink 2s infinite' }}></div> Active
          </div>
        </div>

        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0', minHeight: '300px', maxHeight: 'calc(100vh - 360px)' }}>
          {messages.map((msg, i) => {
            const options = msg.role === 'assistant' ? parseOptions(msg.content) : [];
            return (
              <div key={i} className={`msg-row ${msg.role === 'user' ? 'user-row' : ''}`} style={{ display: 'flex', gap: '10px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                <div className={`msg-avatar ${msg.role === 'assistant' ? 'ai-av' : ''}`} style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: msg.role === 'assistant' ? 'linear-gradient(135deg, var(--accent2), var(--green))' : 'var(--card2)', border: '1px solid var(--border)', color: msg.role === 'assistant' ? '#000' : 'inherit' }}>
                  {msg.role === 'user' ? '👤' : '⚕'}
                </div>
                <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className={`msg-bubble ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`} style={{ padding: '14px 16px', borderRadius: '14px', fontSize: '0.88rem', lineHeight: 1.6, background: msg.role === 'user' ? 'rgba(0,212,255,0.1)' : 'var(--card)', border: msg.role === 'user' ? '1px solid rgba(0,212,255,0.15)' : '1px solid var(--border)', borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px', borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '14px' }}
                    dangerouslySetInnerHTML={{ __html: formatResponse(msg.content) }} />
                  
                  {options.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      {options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleSend(opt)}
                          style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.78rem', cursor: 'pointer', color: 'var(--accent)', transition: 'all 0.2s' }}
                          className="opt-btn"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="msg-time" style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '2px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    {msg.role === 'user' ? 'You' : 'IDP Agent'}
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="msg-row">
              <div className="msg-avatar ai-av" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'linear-gradient(135deg, var(--accent2), var(--green))', border: '1px solid var(--border)', color: '#000' }}>⚕</div>
              <div className="msg-bubble ai-bubble" style={{ maxWidth: '75%', padding: '14px 16px', borderRadius: '14px', background: 'var(--card)', border: '1px solid var(--border)', borderBottomLeftRadius: '4px' }}>
                <div className="typing-indicator" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div className="typing-dot" style={{ width: '7px', height: '7px', background: 'var(--accent)', borderRadius: '50%', animation: 'typing 1.2s infinite' }}></div>
                  <div className="typing-dot" style={{ width: '7px', height: '7px', background: 'var(--accent)', borderRadius: '50%', animation: 'typing 1.2s infinite', animationDelay: '0.2s' }}></div>
                  <div className="typing-dot" style={{ width: '7px', height: '7px', background: 'var(--accent)', borderRadius: '50%', animation: 'typing 1.2s infinite', animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area" style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginTop: '14px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            className="chat-textarea"
            placeholder="Ask about hospitals, doctors, medical deserts, routing..."
            rows="1"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '0.92rem', fontFamily: 'var(--font-body)', resize: 'none', minHeight: '24px', maxHeight: '120px', lineHeight: 1.5 }}
          />
          <button
            disabled={isLoading || !input.trim()}
            className="send-btn"
            onClick={() => handleSend()}
            style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent))', border: 'none', color: '#000', width: '40px', height: '40px', borderRadius: '10px', cursor: (isLoading || !input.trim()) ? 'default' : 'pointer', fontSize: '1.1rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (isLoading || !input.trim()) ? 0.5 : 1 }}
          >➤</button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes typing { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
        .ai-bubble strong { color: var(--accent); }
        .ai-bubble ul { padding-left: 16px; margin: 6px 0; }
        .ai-bubble li { margin-bottom: 3px; }
        .ai-bubble .highlight-red { color: var(--red); font-weight: 600; }
        .ai-bubble .highlight-green { color: var(--green); font-weight: 600; }
        .ai-bubble .highlight-yellow { color: var(--yellow); font-weight: 600; }
        @media(max-width:800px){ .agent-layout { grid-template-columns:1fr !important; height:auto !important; } }
      `}} />
    </div>
  );
}

export default Agent;
