import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './pages/landing';
import { Dashboard } from './templates/Dashboard';
import { Community } from './templates/community';
import { CalendarApp } from "./pages/Schedule";
import './App.css';
import './Loader.css';
import {Rooms} from './pages/rooms';
function Routing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Landing />} />
          <Route element={<Dashboard />}>
            <Route path='/community' element={<Community />} />
            <Route path='/schedule' element={<CalendarApp />} />
            <Route path='/rooms' element={<Rooms/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;