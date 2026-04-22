import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Hospitals from './pages/Hospitals';
import Doctors from './pages/Doctors';
import MapPage from './pages/MapPage';
import Agent from './pages/Agent';
import Deserts from './pages/Deserts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="map" element={<MapPage />} />
        <Route path="agent" element={<Agent />} />
        <Route path="deserts" element={<Deserts />} />
      </Route>
    </Routes>
  );
}

export default App;
