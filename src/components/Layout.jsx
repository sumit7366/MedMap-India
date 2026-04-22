import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <span className="logo-icon">⚕</span>
            <span className="logo-text">MedMap<span className="logo-india">India</span></span>
          </Link>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
            <li><NavLink to="/hospitals" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Hospitals</NavLink></li>
            <li><NavLink to="/doctors" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Doctors</NavLink></li>
            <li><NavLink to="/map" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Map View</NavLink></li>
            <li><NavLink to="/agent" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>AI Agent</NavLink></li>
            <li><NavLink to="/deserts" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Medical Deserts</NavLink></li>
          </ul>
          <div className="nav-badge">IDP Agent v1.0</div>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      <ChatbotWidget />

      <footer className="footer" style={{ marginTop: 'auto' }}>
        <div className="footer-inner" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <Link to="/" className="nav-logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="logo-icon">⚕</span>
              <span className="logo-text">MedMap<span className="logo-india">India</span></span>
            </Link>
            <p style={{ maxWidth: '400px', lineHeight: 1.6 }}>Powered by Databricks · Built for the Virtue Foundation. <br/>Providing intelligent, data-driven healthcare insights across India.</p>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Platform</h4>
            <div className="footer-links" style={{ flexDirection: 'column', gap: '10px' }}>
              <Link to="/hospitals">Hospitals & Clinics</Link>
              <Link to="/doctors">Medical Professionals</Link>
              <Link to="/map">Interactive Map</Link>
              <Link to="/agent">AI Triage Agent</Link>
              <Link to="/deserts">Medical Deserts</Link>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Security & Privacy</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5, marginBottom: '12px' }}>
              🔒 <strong>HIPAA Compliant</strong><br/>
              Your medical queries and location data are strictly anonymized and encrypted in transit and at rest.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5 }}>
              🛡️ <strong>AI Safety</strong><br/>
              Our AI acts as an assistant and routing tool. It does not replace professional medical advice.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text3)' }}>
          © {new Date().getFullYear()} MedMap India. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
