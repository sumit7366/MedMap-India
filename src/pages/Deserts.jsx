import React from 'react';
import { HOSPITALS, DOCTORS, getDesertLabel, typeIcon, getScoreClass } from '../data';

function Deserts() {
  const deserts = HOSPITALS.filter(h => h.medicalDesertScore >= 7).sort((a, b) => b.medicalDesertScore - a.medicalDesertScore);
  const severe = HOSPITALS.filter(h => h.medicalDesertScore >= 9);
  const totalDocs = HOSPITALS.filter(h => h.medicalDesertScore >= 7).reduce((a, h) => a + h.numberDoctors, 0);
  const availableDocs = DOCTORS.filter(d => d.availableForTransfer).length;

  const recommendations = {
    H007: "Deploy specialist doctors from urban centers. Jan Swasthya Sahyog [N002] active in neighboring CG. Urgent need: cardiologist, neurologist.",
    H008: "MSF India [N003] or Doctors For You [N001] should be contacted for immediate deployment. X-Ray machine non-functional — needs urgent replacement.",
    H009: "Doctors For You [N001] covers Bihar region. Only 4 doctors for large tribal population. Need: surgeon, gynecologist, pediatrician.",
    H014: "Maharashtra government should prioritize this tribal district. Nearest tertiary care: Tata Memorial Mumbai (350km away). ICU lacks ventilators.",
    H012: "Only 1 doctor, OPD-only facility, no emergency care. UP Government health mission needs immediate intervention here."
  };

  const sortedHospitals = [...HOSPITALS].sort((a, b) => b.medicalDesertScore - a.medicalDesertScore);

  return (
    <div className="page-inner">
      <div className="deserts-hero" style={{
        background: 'linear-gradient(135deg, rgba(255,71,87,0.1), rgba(255,107,53,0.05))',
        border: '1px solid rgba(255,71,87,0.2)', borderRadius: 'var(--radius-lg)',
        padding: '32px', marginBottom: '32px'
      }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>🚨 Medical Desert Analysis</h2>
        <p style={{ color: 'var(--text2)', maxWidth: '600px' }}>Regions where healthcare infrastructure is critically insufficient to meet population needs — identified through IDP extraction and capability scoring.</p>
        <div className="deserts-stats" style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div className="ds-stat" style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
            <div className="ds-stat-val text-red" style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800 }}>{deserts.length}</div>
            <div className="ds-stat-label" style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Critical Medical Deserts</div>
          </div>
          <div className="ds-stat" style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
            <div className="ds-stat-val text-red" style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800 }}>{severe.length}</div>
            <div className="ds-stat-label" style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Severe (Score 9-10)</div>
          </div>
          <div className="ds-stat" style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
            <div className="ds-stat-val text-yellow" style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800 }}>{totalDocs}</div>
            <div className="ds-stat-label" style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Doctors in Desert Zones</div>
          </div>
          <div className="ds-stat" style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
            <div className="ds-stat-val text-accent" style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800 }}>{availableDocs}</div>
            <div className="ds-stat-label" style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Doctors Available for Transfer</div>
          </div>
        </div>
      </div>

      <div id="desertCards">
        {deserts.map(h => (
          <div key={h.id} className={`desert-card ${h.medicalDesertScore >= 9 ? 'severe' : 'critical'}`} style={{
            background: h.medicalDesertScore >= 9 ? 'rgba(255,71,87,0.07)' : 'rgba(255,71,87,0.04)',
            border: `1px solid ${h.medicalDesertScore >= 9 ? 'rgba(255,71,87,0.5)' : 'rgba(255,71,87,0.3)'}`,
            borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '16px', transition: 'all 0.2s'
          }}>
            <div className="desert-card-head" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div className={`desert-score-ring ring-${Math.min(h.medicalDesertScore, 10)}`} style={{
                width: '60px', height: '60px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 800,
                background: h.medicalDesertScore >= 9 ? 'rgba(255,71,87,0.15)' : 'rgba(255,107,53,0.15)',
                color: h.medicalDesertScore >= 9 ? 'var(--red)' : 'var(--orange)',
                border: `2px solid ${h.medicalDesertScore >= 9 ? 'var(--red)' : 'var(--orange)'}`
              }}>{h.medicalDesertScore}/10</div>
              <div>
                <div className="desert-card-title" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem' }}>{h.name}</div>
                <div className="desert-card-loc" style={{ color: 'var(--text2)', fontSize: '0.85rem', marginTop: '4px' }}>📍 {h.city}, {h.state} · {h.region} · {h.type}</div>
                <div style={{ marginTop: '6px' }}>
                  <span className="score-badge score-10">{getDesertLabel(h.medicalDesertScore)}</span>
                  &nbsp;<span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{h.operator} · Est. {h.yearEstablished}</span>
                </div>
              </div>
            </div>

            <div className="gap-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', marginTop: '14px' }}>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Doctors</div>
                <div className={`gap-value ${h.numberDoctors <= 4 ? 'text-red' : h.numberDoctors <= 20 ? 'text-yellow' : 'text-green'}`} style={{ fontWeight: 600 }}>{h.numberDoctors}</div>
              </div>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Beds</div>
                <div className={`gap-value ${h.capacity <= 50 ? 'text-red' : h.capacity <= 200 ? 'text-yellow' : 'text-green'}`} style={{ fontWeight: 600 }}>{h.capacity}</div>
              </div>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>ICU</div>
                <div className="gap-value text-red" style={{ fontWeight: 600 }}>{h.capabilities.find(c => c.toLowerCase().includes("icu")) || "None / Very Limited"}</div>
              </div>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Specialties</div>
                <div className="gap-value text-yellow" style={{ fontWeight: 600 }}>{h.specialties.length} available</div>
              </div>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Equipment</div>
                <div className={`gap-value ${h.equipment.length <= 3 ? 'text-red' : 'text-yellow'}`} style={{ fontWeight: 600 }}>{h.equipment.length} items</div>
              </div>
              <div className="gap-item" style={{ background: 'var(--card2)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem' }}>
                <div className="gap-item-label" style={{ color: 'var(--text3)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Volunteers</div>
                <div className={`gap-value ${h.acceptsVolunteers ? 'text-green' : 'text-red'}`} style={{ fontWeight: 600 }}>{h.acceptsVolunteers ? "✅ Accepted" : "❌ No"}</div>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '6px' }}>Capabilities</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {h.capabilities.map(c => (
                  <span key={c} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,71,87,0.1)', color: 'var(--red)' }}>{c}</span>
                ))}
              </div>
            </div>

            {recommendations[h.id] && (
              <div className="recommendation" style={{
                marginTop: '14px', padding: '12px 16px', borderRadius: '8px',
                background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.15)',
                fontSize: '0.85rem', color: 'var(--text2)'
              }}>
                <strong style={{ color: 'var(--green)' }}>💡 Recommendation:</strong> {recommendations[h.id]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>📊 All Facilities Coverage Ranking</h2>
        <div style={{ overflowX: 'auto', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '8px' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px' }}>Facility</th>
                <th style={{ padding: '12px' }}>City</th>
                <th style={{ padding: '12px' }}>State</th>
                <th style={{ padding: '12px' }}>Beds</th>
                <th style={{ padding: '12px' }}>Doctors</th>
                <th style={{ padding: '12px' }}>Specialties</th>
                <th style={{ padding: '12px' }}>Coverage</th>
              </tr>
            </thead>
            <tbody>
              {sortedHospitals.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}><strong>{h.name}</strong> <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{typeIcon(h.type)}</span></td>
                  <td style={{ padding: '12px' }}>{h.city}</td>
                  <td style={{ padding: '12px' }}>{h.state}</td>
                  <td style={{ padding: '12px' }}>{h.capacity}</td>
                  <td style={{ padding: '12px' }}>{h.numberDoctors}</td>
                  <td style={{ padding: '12px' }}>{h.specialties.length}</td>
                  <td style={{ padding: '12px' }}><span className={`score-badge ${getScoreClass(h.medicalDesertScore)}`}>{getDesertLabel(h.medicalDesertScore)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Deserts;
