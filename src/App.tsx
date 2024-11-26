import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SolarSystemSearch from './pages/SolarSystemSearch';
import BatterySearch from './pages/BatterySearch';
import ConstructionCostSearch from './pages/ConstructionCostSearch';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/solar-system-search" element={<PrivateRoute><SolarSystemSearch /></PrivateRoute>} />
        <Route path="/battery-search" element={<PrivateRoute><BatterySearch /></PrivateRoute>} />
        <Route path="/construction-cost-search" element={<PrivateRoute><ConstructionCostSearch /></PrivateRoute>} />
      </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
