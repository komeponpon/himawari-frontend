import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SolarSystemSearch from './pages/SolarSystemSearch';
import BatterySearch from './pages/BatterySearch';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system-search" element={<SolarSystemSearch />} />
        <Route path="/battery-search" element={<BatterySearch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
