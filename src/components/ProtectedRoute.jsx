import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired, clearAuthData } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if token is expired or missing
  if (!token || isTokenExpired(token)) {
    clearAuthData(); // Clear expired/missing token data
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    clearAuthData(); // Clear data if user is missing
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'Member') {
      return <Navigate to="/user" replace />;
    } else if (user.role === 'Manager') {
      return <Navigate to="/manager" replace />;
    }
    // If role is not recognized, clear data and redirect to login
    clearAuthData();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 