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
export const updateworkspace = async(workspaceId, workspaceData) => {
  try {
    const response = await axios.put(`${API_URL}/space/updateWorkspace/${workspaceId}`, workspaceData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || 'Workspace update failed';
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
export const createWorkspace = async (workspaceData) => {
  try {
    const response = await axios.post(`${API_URL}/space/createWorkspace`, workspaceData);
    return response.data; 
  } catch (error) { 
    console.log(error); 
    throw error.response?.data || 'Workspace creation failed'; 

  }
};
export const gemini = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/gemini/generate`, { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Gemini generation failed';
  }
};

export const updateWorkspace = async (workspaceId, workspaceData) => {
  try {
    const response = await axios.put(`${API_URL}/space/updateWorkspace/${workspaceId}`, workspaceData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || 'Workspace update failed';
  }};
export const markMultipleAsRead = async (notificationIds) => {
  try {
    const response = await axios.put(`${API_URL}/notification/markallseen`, notificationIds);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || 'Marking notifications as read failed';}}
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
    if (error.response && error.response.status === 409) {
      throw new Error('Booking conflict: This workspace is already booked for the selected time. Please refer to the calendar for available slots.');
    }
    throw new Error('An error occurred while creating the booking.');
  }
};
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
    return {
      data: response.data,
      message: "Member updated successfully"
    };
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

export const deleteMember = async (memberId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/deleteMember/${memberId}`);
    return {
      data: response.data,
      message: "Member deleted successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Member deletion failed';
  }
};

export const setMemberToManagerRole = async (memberId) => {
  try {
    const response = await axios.put(`${API_URL}/users/setMemberToManagerRole/${memberId}`);
    return {
      data: response.data,
      message: "Manager role assigned successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Assigning manager role failed';
  }
};

export const createPaiment = async (paimentData) => {
  try {
    const response = await axios.post(`${API_URL}/paiments/createPaimentLog`, paimentData);
    return {
      data: response.data,
      message: "Payment created successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Payment creation failed';
  }
};

export const confirmPaiment = async (paimentId) => {
  try {
    const response = await axios.put(`${API_URL}/paiments/confirmPaiment/${paimentId}`);
    return {
      data: response.data,
      message: "Payment confirmed successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Payment confirmation failed';
  }
};

export const deletePaiment = async (paimentId) => {
  try {
    const response = await axios.delete(`${API_URL}/paiments/deletePaiment/${paimentId}`);
    return {
      data: response.data,
      message: "Payment deleted successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Payment deletion failed';
  }
};

export const cancelPaiment = async (paimentId, data) => {
  try {
    const response = await axios.put(`${API_URL}/paiments/cancelPaiment/${paimentId}`, data);
    return {
      data: response.data,
      message: "Payment cancelled successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Payment cancellation failed';
  }
};

export const getPaimentsLastSixMonths = async () => {
  try {
    const response = await getPaiments();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const filteredPaiments = response.filter(paiment => {
      const paimentDate = new Date(paiment.date);
      return paimentDate >= sixMonthsAgo;
    });
    console.log('Filtered payments:', filteredPaiments);
    return filteredPaiments;
  } catch (error) {
    throw error.response?.data || 'Payment retrieval for last six months failed';
  }
};

export const getUserSignupsByMonth = async () => {
  try {
    const users = await getUsers();
    const signupsByMonth = {};

    users.forEach(user => {
      const date = new Date(user.createdAt);
      const month = date.toISOString().slice(0, 7);
      signupsByMonth[month] = (signupsByMonth[month] || 0) + 1;
    });

    return signupsByMonth;
  } catch (error) {
    throw error;
  }
};

export const getUserSignupsLastSixMonths = async () => {
  try {
    const users = await getUsers();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const filteredUsers = users.filter(user => {
      const signupDate = new Date(user.createdAt);
      return signupDate >= sixMonthsAgo;
    });

    const signupsByMonth = {};
    filteredUsers.forEach(user => {
      const date = new Date(user.createdAt);
      const month = date.toISOString().slice(0, 7);
      signupsByMonth[month] = (signupsByMonth[month] || 0) + 1;
    });

    return signupsByMonth;
  } catch (error) {
    throw error.response?.data || 'User signup retrieval for last six months failed';
  }
};

export const getWorkspaceById = async (workspaceId) => {
  try {
    const response = await axios.get(`${API_URL}/space/getWorkspaceById/${workspaceId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Workspace retrieval by ID failed';
  }
};

export const setBookingConfirmed = async (bookingId) => {
  try {
    const response = await axios.put(`${API_URL}/booking/setBookingConfirmed/${bookingId}`);
    return {
      data: response.data,
      message: "Booking confirmed successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Booking confirmation failed';
  }
};

export const setBookingCancelled = async (bookingId) => {
  try {
    const response = await axios.put(`${API_URL}/booking/setBookingCancelled/${bookingId}`);
    return {
      data: response.data,
      message: "Booking cancelled successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Booking cancellation failed';
  }
};

export const addAvailabilityToWorkspace = async (workspaceId, availabilityData) => {
  try {
    const response = await axios.put(`${API_URL}/space/addAvailability/${workspaceId}`, availabilityData);
    return {
      data: response.data,
      message: "Availability added successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Adding availability failed';
  }
};

export const getBookingById = async (bookingId)  =>{
  try {
    const response = await axios.get(`${API_URL}/booking/getBookingById/${bookingId}`);
    return response.data;
  }catch(error){
    console.log(error);
}};

export const markNotificationSeen= async (notificationid)=>{
  try{
    const response =await axios.put(`${API_URL}/notification/markNotificationSeen/${notificationid}`);
    return response.data;
}catch(error){
  console.log(error);
}}
export const getNotifications= async (userId)=>{
  try {
    const response = await axios.get(`${API_URL}/notification/getNotifications/${userId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const createActionLog = async (actionLogData) => {
  try {
    const response = await axios.post(`${API_URL}/action-logs`, actionLogData);
    return {
      data: response.data,
      message: "Action logged successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Action logging failed';
  }
};

export const getUserRankings = async () => {
  try {
    const response = await axios.get(`${API_URL}/action-logs/rankings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user rankings:', error);
    throw error.response?.data || 'Failed to fetch user rankings';
  }
};

export const getUserSpendingRankings = async () => {
  try {
    const response = await axios.get(`${API_URL}/paiments/getUserSpendingRankings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user spending rankings:', error);
    throw error.response?.data || 'Failed to fetch user spending rankings';
  }
};

export const getCurrentMonthPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/paiments/getCurrentMonthPayments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current month payments:', error);
    throw error.response?.data || 'Failed to fetch current month payments';
  }
};

export const updateMemberBehavior = async (memberId, behaviorData) => {
  try {
    const response = await axios.put(`${API_URL}/members/${memberId}/behavior`, behaviorData);
    return {
      data: response.data,
      message: "Member behavior updated successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Behavior update failed';
  }
};

export const archiveMember = async (memberId) => {
  try {
    const response = await axios.put(`${API_URL}/users/archiveMember/${memberId}`);
    return {
      data: response.data,
      message: "Member archived successfully"
    };
  } catch (error) {
    throw error.response?.data || 'Member archiving failed';
  }
};

export const getAllActionLogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/action-logs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching action logs:', error);
    throw error.response?.data || 'Failed to fetch action logs';
  }
};

export const getMemberByID = async (memberId) => {
  try {
    const response = await axios.get(`${API_URL}/users/getMemberById/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching member:', error);
    throw error.response?.data || 'Failed to fetch member';
  }
};