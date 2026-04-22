import React, { useState, useMemo, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { HOSPITALS, NGOS, specialtyLabel, getDesertLabel, typeIcon } from '../data';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const options = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }
  ],
  disableDefaultUI: false,
  zoomControl: true,
};

function getMarkerColor(score) {
  if (score <= 3) return "#00e5a0";
  if (score <= 6) return "#ffa502";
  if (score <= 8) return "#ff6b35";
  return "#ff4757";
}

function MapPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Using env variable
  });

  const [showHospitals, setShowHospitals] = useState(true);
  const [showDeserts, setShowDeserts] = useState(true);
  const [showNGOs, setShowNGOs] = useState(true);
  const [mapFilterVal, setMapFilterVal] = useState("");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedNGO, setSelectedNGO] = useState(null);

  // Geolocation
  const [userLocation, setUserLocation] = useState(null);

  const visibleHospitals = useMemo(() => {
    return HOSPITALS.filter(h => {
      if (mapFilterVal === "public" && h.operator !== "public") return false;
      if (mapFilterVal === "private" && h.operator !== "private") return false;
      if (mapFilterVal === "desert" && h.medicalDesertScore < 7) return false;
      if (!showHospitals && h.medicalDesertScore < 7) return false;
      if (!showDeserts && h.medicalDesertScore >= 7) return false;
      return true;
    });
  }, [mapFilterVal, showHospitals, showDeserts]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (error) => {
        console.error("Error getting location", error);
        alert("Could not get your location. Please ensure location services are enabled.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const onMapLoad = useCallback((map) => {
    // We can save the map instance if needed
  }, []);

  return (
    <div className="map-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', height: 'calc(100vh - 62px)' }}>
      <div className="map-sidebar" style={{ background: 'var(--bg)', borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '20px' }}>🗺️ Map Filters</h2>

        <div style={{ marginBottom: '15px' }}>
          <button onClick={getUserLocation} className="btn-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
            📍 Find My Location
          </button>
        </div>

        <div className="map-filter-group" style={{ marginBottom: '20px' }}>
          <div className="map-filter-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Show Layers</div>
          <button className={`toggle-btn ${showHospitals ? 'active' : ''}`} onClick={() => setShowHospitals(!showHospitals)} style={{
            width: '100%', textAlign: 'left', background: showHospitals ? 'rgba(0,212,255,0.05)' : 'var(--card)', border: `1px solid ${showHospitals ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text)', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
          }}>
            <span className="toggle-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, background: 'var(--accent)' }}></span> Hospitals
          </button>
          <button className={`toggle-btn ${showDeserts ? 'active' : ''}`} onClick={() => setShowDeserts(!showDeserts)} style={{
            width: '100%', textAlign: 'left', background: showDeserts ? 'rgba(0,212,255,0.05)' : 'var(--card)', border: `1px solid ${showDeserts ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text)', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
          }}>
            <span className="toggle-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, background: 'var(--red)' }}></span> Medical Deserts
          </button>
          <button className={`toggle-btn ${showNGOs ? 'active' : ''}`} onClick={() => setShowNGOs(!showNGOs)} style={{
            width: '100%', textAlign: 'left', background: showNGOs ? 'rgba(0,212,255,0.05)' : 'var(--card)', border: `1px solid ${showNGOs ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text)', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
          }}>
            <span className="toggle-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, background: 'var(--yellow)' }}></span> NGOs
          </button>
        </div>

        <div className="map-filter-group" style={{ marginBottom: '20px' }}>
          <div className="map-filter-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Filter by Type</div>
          <select value={mapFilterVal} onChange={e => setMapFilterVal(e.target.value)} className="filter-input" style={{ width: '100%' }}>
            <option value="">All Facilities</option>
            <option value="public">Public Only</option>
            <option value="private">Private Only</option>
            <option value="desert">Medical Deserts Only</option>
          </select>
        </div>

        <div className="legend" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px', marginTop: '16px' }}>
          <div className="map-filter-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Legend</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text2)' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: 'var(--green)' }}></div> Well-served (Score 1-3)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text2)' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: 'var(--yellow)' }}></div> Moderate (Score 4-6)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text2)' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: 'var(--orange)' }}></div> Underserved (Score 7-8)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text2)' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }}></div> Critical Desert (Score 9-10)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.82rem', color: 'var(--text2)' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: 'var(--yellow)', border: '2px solid #fff' }}></div> NGO</div>
        </div>

        {selectedFacility && (
          <div className="selected-info" style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)', padding: '16px', marginTop: '20px' }}>
            <div className="selected-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{selectedFacility.name}</div>
            <div className="selected-body" style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              📍 {selectedFacility.city}, {selectedFacility.state}<br/>
              🏥 {selectedFacility.type} · {selectedFacility.operator}<br/>
              🛏 {selectedFacility.capacity} beds · 👨‍⚕️ {selectedFacility.numberDoctors} doctors<br/>
              Desert Score: <strong style={{ color: getMarkerColor(selectedFacility.medicalDesertScore) }}>{selectedFacility.medicalDesertScore}/10 — {getDesertLabel(selectedFacility.medicalDesertScore)}</strong><br/>
              <br/>
              <strong>Specialties:</strong> {selectedFacility.specialties.slice(0, 3).map(s => specialtyLabel(s)).join(", ")}{selectedFacility.specialties.length > 3 ? "..." : ""}<br/>
              <strong>Volunteers:</strong> {selectedFacility.acceptsVolunteers ? "✅ Accepted" : "❌ Not accepted"}
              <br/><br/>
              <Link to={`/hospitals?id=${selectedFacility.id}`} style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>View Details →</Link>
            </div>
          </div>
        )}

        {selectedNGO && (
          <div className="selected-info" style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)', padding: '16px', marginTop: '20px' }}>
            <div className="selected-title" style={{ fontFamily: 'var(--font-head)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{selectedNGO.name}</div>
            <div className="selected-body" style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              📍 {selectedNGO.city}, {selectedNGO.state}<br/>
              🤝 NGO<br/>
              <br/>
              <strong>Mission:</strong> {selectedNGO.missionStatement}<br/>
              <strong>Regions Served:</strong> {selectedNGO.regionsServed.join(", ")}
            </div>
          </div>
        )}

      </div>

      <div id="mapContainer">
        {!isLoaded ? (
          <div style={{ padding: '20px', color: 'var(--text2)' }}>
            Loading Map... 
            {loadError && " (Error loading Google Maps. Did you set VITE_GOOGLE_MAPS_API_KEY in .env?)"}
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || center}
            zoom={userLocation ? 10 : 5}
            options={options}
            onLoad={onMapLoad}
          >
            {/* User Location Marker */}
            {userLocation && (
              <Marker 
                position={userLocation} 
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: '#ffffff'
                }}
              />
            )}

            {/* Hospital Markers */}
            {visibleHospitals.map(h => {
              const markerColor = getMarkerColor(h.medicalDesertScore);
              return (
                <Marker
                  key={h.id}
                  position={{ lat: h.lat, lng: h.lng }}
                  onClick={() => {
                    setSelectedFacility(h);
                    setSelectedNGO(null);
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: h.medicalDesertScore >= 9 ? 12 : h.medicalDesertScore >= 7 ? 9 : 7,
                    fillColor: markerColor,
                    fillOpacity: 0.85,
                    strokeWeight: 1.5,
                    strokeColor: '#ffffff'
                  }}
                />
              )
            })}

            {/* NGO Markers */}
            {showNGOs && NGOS.map(n => (
              <Marker
                key={n.id}
                position={{ lat: n.lat, lng: n.lng }}
                onClick={() => {
                  setSelectedNGO(n);
                  setSelectedFacility(null);
                }}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#ffa502',
                  fillOpacity: 0.8,
                  strokeWeight: 2,
                  strokeColor: '#ffffff'
                }}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default MapPage;
