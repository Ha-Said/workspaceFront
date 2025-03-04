import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/createMember`, userData);
    return response.data; 
  } catch (error) {
    throw error.response?.data || 'Registration failed'; 
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/getAllMembers`);
    return response.data; 
  } catch (error) {
    throw error.response?.data || 'User retrieval failed'; 
  }
};

export const getAllWorkspaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/space/getAllWorkspaces`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Workspace retrieval failed';
  }
};