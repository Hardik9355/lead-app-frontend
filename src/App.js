import React from 'react';
import { Routes, Route } from 'react-router-dom'

import './App.css';
import Login from './pages/LoginPage';
import LeadPage from './pages/LeadPage';
import CreateLead from './components/CreateLead';
import ForgotPassword from './components/forgotPassword';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" key="login" element={<Login />} />
        <Route path="/dashboard" element={<LeadPage />} key="LeadPage" />
        <Route path="/add-leads" element={<CreateLead />} key="CreateLead" />
        <Route path="/forgot-password" element={<ForgotPassword />} key="ForgotPassword" />

        <Route path="/*" element={<Login />} key="LandingPage" />
      </Routes>
    </div>
  );
}

export default App;
