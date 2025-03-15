//CSS STYLES 
import './App.css';
import './Loader.css';

import Loading from './components/loading';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
//Templates 

import { Dashboard } from './templates/Dashboard';
import {UserDashboard } from './templates/userDashboard';
import { Error } from './pages/Error';
import FAQ from './pages/FAQ'
//MANAGER IMPORTS 
import LoginPage from './pages/login';
import RegisterPage  from './pages/register';
import  Landing  from './pages/managerPages/landing';
import  Community  from './pages/managerPages/community';
import  CalendarApp  from "./pages/managerPages/Schedule";
import Spaces from './pages/managerPages/rooms';
import Reports from'./pages/managerPages/reports';
import AccountForm from './components/managerComponents/editProfile';
import Billing from './pages/managerPages/billing';
import ManagerAnnouncements from './pages/managerPages/announcements';

 //USER IMPORTS
import  UserCalendar  from './pages/userPages/Schedule';
import UserSpaces  from './pages/userPages/spaces';
import Settings from './pages/userPages/settings';
import Profile from './pages/userPages/Profile';
import Announcements from './pages/userPages/announcements';
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
      <Loading/>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Landing />} />
          <Route element={<Dashboard />}>
            
          <Route path='/manager' element={<CalendarApp />} />
            <Route path='/manager/community' element={<Community />} />
            <Route path='/manager/schedule' element={<CalendarApp />} />
            <Route path='/manager/rooms' element={<Spaces/>}/>
            <Route path='/manager/reports' element={<Reports/>} />
            <Route path="/editProfile/:email" element={<AccountForm />} />
            <Route path='/manager/billing' element={<Billing/>}/>
            <Route path='/manager/announcements' element={<ManagerAnnouncements/>}/>
          </Route>
          <Route element={<UserDashboard/>}>
          
            <Route path="/user" element={<UserCalendar />} />
            <Route path="/user/community" element={<Community />} />
            <Route path="/user/schedule" element={<UserCalendar />} />
            <Route path="/user/reports" element={<Reports />} />
            <Route path="/editProfile/:email" element={<AccountForm />} />
            <Route path="/user/billing" element={<Billing />} />
            <Route path="/user/spaces" element={<UserSpaces />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/announcements" element={<Announcements />} />
          </Route>
          <Route path="*" element={<Error/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default Routing;