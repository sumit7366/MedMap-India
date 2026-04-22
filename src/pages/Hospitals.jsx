import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HOSPITALS, typeIcon, specialtyLabel, getScoreClass, getDesertLabel } from '../data';

function Hospitals() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const idFromUrl = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState('');
  const [filterOperator, setFilterOperator] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDesert, setFilterDesert] = useState('');

  const [selectedHospitalId, setSelectedHospitalId] = useState(idFromUrl || null);

  const states = useMemo(() => {
    return [...new Set(HOSPITALS.map(h => h.state))].sort();
  }, []);

  const filteredHospitals = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return HOSPITALS.filter(h => {
      if (q && !h.name.toLowerCase().includes(q) && !h.city.toLowerCase().includes(q) && !h.state.toLowerCase().includes(q)) return false;
      if (filterType && h.type !== filterType) return false;
      if (filterOperator && h.operator !== filterOperator) return false;
      if (filterState && h.state !== filterState) return false;
      if (filterDesert === "good" && h.medicalDesertScore > 3) return false;
      if (filterDesert === "medium" && (h.medicalDesertScore < 4 || h.medicalDesertScore > 6)) return false;
      if (filterDesert === "bad" && h.medicalDesertScore < 7) return false;
      return true;
    });
  }, [searchQuery, filterType, filterOperator, filterState, filterDesert]);

  // Handle URL ID parameter to open modal automatically
  useEffect(() => {
    if (idFromUrl) {
      setSelectedHospitalId(idFromUrl);
    }
  }, [idFromUrl]);

  // Modal logic
  const selectedHospital = useMemo(() => {
    if (!selectedHospitalId) return null;
    return HOSPITALS.find(h => h.id === selectedHospitalId);
  }, [selectedHospitalId]);

  useEffect(() => {
    if (selectedHospitalId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedHospitalId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedHospitalId(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="page-inner">
      <h1 className="page-title">🏥 Healthcare Facilities</h1>
      <p className="page-subtitle">All mapped hospitals, clinics and health centres across India — <span>{filteredHospitals.length}</span> facilities</p>

      <div className="filter-bar">
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by name, city, state..." 
          className="filter-input" 
          style={{ width: '260px' }} 
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-input">
          <option value="">All Types</option>
          <option value="hospital">Hospital</option>
          <option value="clinic">Clinic</option>
        </select>
        <select value={filterOperator} onChange={e => setFilterOperator(e.target.value)} className="filter-input">
          <option value="">All Operators</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <select value={filterState} onChange={e => setFilterState(e.target.value)} className="filter-input">
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterDesert} onChange={e => setFilterDesert(e.target.value)} className="filter-input">
          <option value="">All Coverage</option>
          <option value="good">Well-served (≤3)</option>
          <option value="medium">Moderate (4-6)</option>
          <option value="bad">Underserved (7+)</option>
        </select>
      </div>

      <div className="hospital-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
        {filteredHospitals.length === 0 ? (
          <div style={{ color: 'var(--text2)', padding: '40px' }}>No results found.</div>
        ) : (
          filteredHospitals.map(h => (
            <div key={h.id} className="hosp-card" onClick={() => setSelectedHospitalId(h.id)} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '24px', cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div className="hosp-head" style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <span className="hosp-icon" style={{ fontSize: '2rem' }}>{typeIcon(h.type)}</span>
                <div>
                  <div className="hosp-title" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px', lineHeight: 1.3 }}>{h.name}</div>
                  <div className="hosp-loc" style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>📍 {h.city}, {h.state}</div>
                </div>
              </div>
              <div className="hosp-meta" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div className="hosp-stat" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}><div className="hosp-stat-val" style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{h.capacity}</div><div className="hosp-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>Beds</div></div>
                <div className="hosp-stat" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}><div className="hosp-stat-val" style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{h.numberDoctors}</div><div className="hosp-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>Doctors</div></div>
                <div className="hosp-stat" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}><div className="hosp-stat-val" style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{h.yearEstablished}</div><div className="hosp-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>Est.</div></div>
                <div className="hosp-stat" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}><div className={`hosp-stat-val ${h.medicalDesertScore >= 7 ? 'text-red' : h.medicalDesertScore >= 4 ? 'text-yellow' : 'text-green'}`} style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 800 }}>{h.medicalDesertScore}/10</div><div className="hosp-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>Desert</div></div>
              </div>
              <div className="hosp-specialties" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {h.specialties.slice(0, 4).map(s => (
                  <span key={s} className="hosp-spec" style={{ fontSize: '0.72rem', background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{specialtyLabel(s)}</span>
                ))}
                {h.specialties.length > 4 && <span className="hosp-spec" style={{ fontSize: '0.72rem', background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>+{h.specialties.length - 4} more</span>}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={`score-badge ${getScoreClass(h.medicalDesertScore)}`}>{getDesertLabel(h.medicalDesertScore)}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{h.operator} · {h.address_country}</span>
                {h.acceptsVolunteers && <span style={{ fontSize: '0.78rem', color: 'var(--green)' }}>✓ Volunteers</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedHospital && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target.className.includes("modal-overlay")) setSelectedHospitalId(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setSelectedHospitalId(null)}>✕</button>
            <h2>{selectedHospital.name}</h2>
            <div className="modal-location">📍 {selectedHospital.address_city}, {selectedHospital.state} &nbsp;|&nbsp; {typeIcon(selectedHospital.type)} {selectedHospital.type} &nbsp;|&nbsp; <span className={`score-badge ${getScoreClass(selectedHospital.medicalDesertScore)}`}>{getDesertLabel(selectedHospital.medicalDesertScore)}</span></div>
            <div className="modal-section"><div className="modal-section-title">Overview</div><p style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>{selectedHospital.description}</p></div>
            <div className="modal-info-grid">
              <div className="modal-info-item"><div className="modal-info-label">Capacity</div><div className="modal-info-value text-accent">{selectedHospital.capacity} beds</div></div>
              <div className="modal-info-item"><div className="modal-info-label">Doctors</div><div className="modal-info-value text-green">{selectedHospital.numberDoctors}</div></div>
              <div className="modal-info-item"><div className="modal-info-label">Operator</div><div className="modal-info-value">{selectedHospital.operator}</div></div>
              <div className="modal-info-item"><div className="modal-info-label">Established</div><div className="modal-info-value">{selectedHospital.yearEstablished}</div></div>
              <div className="modal-info-item"><div className="modal-info-label">Desert Score</div><div className="modal-info-value text-red">{selectedHospital.medicalDesertScore}/10</div></div>
              <div className="modal-info-item"><div className="modal-info-label">Volunteers</div><div className="modal-info-value">{selectedHospital.acceptsVolunteers ? "✅ Yes" : "❌ No"}</div></div>
            </div>
            <div className="modal-section"><div className="modal-section-title">Specialties</div><div className="modal-tags">{selectedHospital.specialties.map(s => <span key={s} className="modal-tag">{specialtyLabel(s)}</span>)}</div></div>
            <div className="modal-section"><div className="modal-section-title">Equipment</div><div className="modal-tags">{selectedHospital.equipment.map(e => <span key={e} className="modal-tag">{e}</span>)}</div></div>
            <div className="modal-section"><div className="modal-section-title">Procedures</div><div className="modal-tags">{selectedHospital.procedures.map(p => <span key={p} className="modal-tag">{p}</span>)}</div></div>
            <div className="modal-section"><div className="modal-section-title">Capabilities</div><div className="modal-tags">{selectedHospital.capabilities.map(c => <span key={c} className="modal-tag">{c}</span>)}</div></div>
            {selectedHospital.phone && (
              <div className="modal-section">
                <div className="modal-section-title">Contact</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text2)' }}>
                  {selectedHospital.phone}
                  {selectedHospital.email && ` | ${selectedHospital.email}`}
                  {selectedHospital.website && <span> | <a href={`https://${selectedHospital.website}`} target="_blank" rel="noreferrer">{selectedHospital.website}</a></span>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospitals;
