import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DOCTORS, specialtyLabel } from '../data';

function Doctors() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const idFromUrl = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterTransfer, setFilterTransfer] = useState('');

  const [selectedDoctorId, setSelectedDoctorId] = useState(idFromUrl || null);

  const specialties = useMemo(() => {
    return [...new Set(DOCTORS.map(d => d.specialty))].sort();
  }, []);

  const states = useMemo(() => {
    return [...new Set(DOCTORS.map(d => d.state))].sort();
  }, []);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return DOCTORS.filter(d => {
      if (q && !d.name.toLowerCase().includes(q) && !d.city.toLowerCase().includes(q) && !d.specialty.toLowerCase().includes(q) && !d.subSpecialty.toLowerCase().includes(q)) return false;
      if (filterSpecialty && d.specialty !== filterSpecialty) return false;
      if (filterState && d.state !== filterState) return false;
      if (filterTransfer === "yes" && !d.availableForTransfer) return false;
      if (filterTransfer === "no" && d.availableForTransfer) return false;
      return true;
    });
  }, [searchQuery, filterSpecialty, filterState, filterTransfer]);

  useEffect(() => {
    if (idFromUrl) {
      setSelectedDoctorId(idFromUrl);
    }
  }, [idFromUrl]);

  const selectedDoctor = useMemo(() => {
    if (!selectedDoctorId) return null;
    return DOCTORS.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  useEffect(() => {
    if (selectedDoctorId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedDoctorId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedDoctorId(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="page-inner">
      <h1 className="page-title">👨‍⚕️ Medical Professionals</h1>
      <p className="page-subtitle">Doctors mapped across Indian healthcare facilities — <span>{filteredDoctors.length}</span> professionals</p>

      <div className="filter-bar">
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by name, specialty, city..." 
          className="filter-input" 
          style={{ width: '260px' }} 
        />
        <select value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)} className="filter-input">
          <option value="">All Specialties</option>
          {specialties.map(s => <option key={s} value={s}>{specialtyLabel(s)}</option>)}
        </select>
        <select value={filterState} onChange={e => setFilterState(e.target.value)} className="filter-input">
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterTransfer} onChange={e => setFilterTransfer(e.target.value)} className="filter-input">
          <option value="">All</option>
          <option value="yes">Available for Transfer</option>
          <option value="no">Not Available</option>
        </select>
      </div>

      <div className="doctors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
        {filteredDoctors.length === 0 ? (
          <div style={{ color: 'var(--text2)', padding: '40px' }}>No results found.</div>
        ) : (
          filteredDoctors.map(d => (
            <div key={d.id} className="doc-card" onClick={() => setSelectedDoctorId(d.id)} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '24px', cursor: 'pointer',
              transition: 'all 0.2s', position: 'relative'
            }}>
              {d.availableForTransfer && (
                <div className="transfer-badge" style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--yellow)', color: '#000', fontSize: '0.68rem', fontWeight: 800,
                  padding: '3px 10px', borderRadius: '12px'
                }}>🚀 For Transfer</div>
              )}
              <div className="doc-avatar" style={{
                width: '64px', height: '64px', background: 'var(--bg2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', overflow: 'hidden', border: '1px solid var(--border)'
              }}>
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(d.name)}&backgroundColor=e5f1ff`} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="doc-name" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{d.name}</div>
              <div className="doc-specialty" style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '2px' }}>{specialtyLabel(d.specialty)}</div>
              <div className="doc-sub" style={{ fontSize: '0.78rem', color: 'var(--text2)', marginBottom: '12px' }}>{d.subSpecialty}</div>
              <div className="doc-hospital" style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '14px', padding: '8px 12px', background: 'var(--card2)', borderRadius: '8px' }}>🏥 {d.hospital}, {d.city}</div>
              <div className="doc-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span className="doc-tag doc-exp" style={{ background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px', fontWeight: 600 }}>{d.experience} yrs exp</span>
                <span className="doc-tag doc-fee" style={{ background: 'rgba(52,199,89,0.1)', color: 'var(--green)', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px', fontWeight: 600 }}>{d.consultationFee === 0 ? "Free" : "₹" + d.consultationFee}</span>
                {d.qualifications.slice(0, 2).map(q => (
                  <span key={q} className="doc-tag" style={{ background: 'var(--border2)', color: 'var(--text)', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px', fontWeight: 600 }}>{q}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedDoctor && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target.className.includes("modal-overlay")) setSelectedDoctorId(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setSelectedDoctorId(null)}>✕</button>
            <h2>{selectedDoctor.name}</h2>
            <div className="modal-location">👨‍⚕️ {specialtyLabel(selectedDoctor.specialty)} &nbsp;|&nbsp; {selectedDoctor.subSpecialty} &nbsp;|&nbsp; {selectedDoctor.city}, {selectedDoctor.state}</div>
            <div className="modal-section">
              <div className="modal-info-grid">
                <div className="modal-info-item"><div className="modal-info-label">Experience</div><div className="modal-info-value text-accent">{selectedDoctor.experience} years</div></div>
                <div className="modal-info-item"><div className="modal-info-label">Consultation Fee</div><div className="modal-info-value text-green">{selectedDoctor.consultationFee === 0 ? "Free" : "₹" + selectedDoctor.consultationFee}</div></div>
                <div className="modal-info-item"><div className="modal-info-label">Hospital</div><div className="modal-info-value" style={{ fontSize: '0.82rem' }}>{selectedDoctor.hospital}</div></div>
                <div className="modal-info-item"><div className="modal-info-label">For Transfer</div><div className="modal-info-value">{selectedDoctor.availableForTransfer ? "✅ Yes" : "❌ No"}</div></div>
              </div>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Qualifications</div>
              <div className="modal-tags">{selectedDoctor.qualifications.map(q => <span key={q} className="modal-tag">{q}</span>)}</div>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Procedures</div>
              <div className="modal-tags">{selectedDoctor.procedures.map(p => <span key={p} className="modal-tag">{p}</span>)}</div>
            </div>
            <div className="modal-section">
              <div className="modal-section-title">Languages</div>
              <div className="modal-tags">{selectedDoctor.languages.map(l => <span key={l} className="modal-tag">{l}</span>)}</div>
            </div>
            {selectedDoctor.phone && (
              <div className="modal-section">
                <div className="modal-section-title">Contact</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text2)' }}>{selectedDoctor.phone}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
