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
    console.log(error); 
    throw error.response?.data || 'Workspace retrieval failed';
  
  }
};
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/booking/getAllBookings`);
    return response.data;
  }
  catch (error) {
    throw error.response?.data || 'Booking retrieval failed';
  }
};

export const getPaiments = async () => {
  try {
    const response = await axios.get(`${API_URL}/paiments/getPaiments`);
    
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    throw error.response?.data || 'Payment retrieval failed';
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/booking/createBooking`, bookingData);
    return response.data;
    } catch (error) {
    throw error.response?.data || 'Booking creation failed';
    }
}
export const getBookingByMemberId = async (memberId) => {
  try {
    const response = await axios.get(`${API_URL}/booking/getBookingByMemberId/${memberId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Booking retrieval failed';
  }
}
export const updateBooking = async (bookingData) => {
  try{
    const response =await axios.put(`${API_URL}/booking/updateBooking/${bookingData.id}`, bookingData);
    return response.data;

  }catch (error){
    console.log(error);
    throw error.response?.data || 'Booking update failed';
  }
}