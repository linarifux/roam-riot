import axios from 'axios';
import config from '../config/config';

const API_URL = `${config.apiBaseUrl}/users`;

// Configure global axios defaults
axios.defaults.withCredentials = true; // Important for Cookies!

// Register User (Handles FormData)
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Explicitly set for file uploads
    },
  });
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  localStorage.removeItem('user');
  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;