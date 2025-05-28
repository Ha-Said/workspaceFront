
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    if (!token.includes('.')) {
      console.warn('Token is not in JWT format');
      return true;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid JWT token format');
      return true;
    }

    const payload = JSON.parse(atob(parts[1]));
    
    if (!payload.exp) {
      console.warn('Token payload does not contain expiration');
      return true;
    }

    const expiry = payload.exp * 1000; 
    return Date.now() >= expiry;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; 
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}; 