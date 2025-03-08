import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/managerPages/login';
import { RegisterPage } from './pages/managerPages/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './pages/managerPages/landing';
import { Dashboard } from './templates/Dashboard';
import {UserDashboard } from './templates/userDashboard';
import { Community } from './templates/community';
import { CalendarApp } from "./pages/managerPages/Schedule";
import './App.css';
import './Loader.css';
import {Rooms} from './pages/managerPages/rooms';
import Reports from'./pages/managerPages/reports';
import AccountForm from './components/managerComponents/editProfile';
import {Billing} from './pages/managerPages/billing';
//USER IMPORTS
import { UserCalendar } from './pages/userPages/Schedule';
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
            <Route path='/manager/community' element={<Community />} />
            <Route path='/manager/schedule' element={<CalendarApp />} />
            <Route path='/manager/rooms' element={<Rooms/>}/>
            <Route path='/manager/reports' element={<Reports/>} />
            <Route path="/editProfile/:email" element={<AccountForm />} />
            <Route path='/manager/billing' element={<Billing/>}/>
          </Route>
          <Route element={<UserDashboard/>}>
          <Route path="/user/community" element={<Community />} />
          <Route path="/user/schedule" element={<UserCalendar />} />
          <Route path="/user/rooms" element={<Rooms />} />
          <Route path="/user/reports" element={<Reports />} />
          <Route path="/editProfile/:email" element={<AccountForm />} />
          <Route path="/user/billing" element={<Billing />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />

        </Routes>
      </Router>
    </div>
  );
}

export default Routing;