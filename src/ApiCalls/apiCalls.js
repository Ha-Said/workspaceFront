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
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/booking/deleteBooking/${bookingId}`);
    return response.data;
  }catch (error){
    console.log(error);
    throw error.response?.data || 'Booking deletion failed';
  }};
  export const sendBooking = async(bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/email/sendBooking`, bookingData);
      return response.data;

    }catch (error){
      console.log(error);
      throw error.response?.data || 'Invitation failed';
    }
  }

export const updateMember = async (memberId, memberData) => {
  try {
    const response = await axios.put(`${API_URL}/users/updateMember/${memberId}`, memberData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Member update failed';
  }
};
export const logoutUser = async () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    throw error.response?.data || 'Logout failed';
  }
}

export const getAllAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_URL}/announcements/getAllAnnouncements`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Announcement retrieval failed';
  }
};

export const createAnnouncement = async (announcementData) => {
  try {
    const response = await axios.post(`${API_URL}/announcements/createAnnouncement`, announcementData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Announcement creation failed';
  }
};

export const deleteMember = async(memberId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/deleteMember/${memberId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Member deletion failed';
  }
};

export const setMemberToManagerRole = async (memberId) => {
  
  console.log(memberId);
  try {
    const response = await axios.put(`${API_URL}/users/setMemberToManagerRole/${memberId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Assigning manager role failed';
  }
};