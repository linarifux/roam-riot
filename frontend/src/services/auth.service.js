import axios from 'axios';

// Use environment variable for Vite (or fallback to localhost)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
const API_URL = `${BASE_URL}/users`;

// Configure global axios defaults
axios.defaults.withCredentials = true; // Critical for sending Cookies (RefreshToken)

// Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Required for file uploads (Avatar/Cover)
    },
  });
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data.data) {
    // 1. Save User Profile
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    
    // 2. Save Tokens (Critical for Auth State)
    localStorage.setItem('accessToken', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
  }
  
  return response.data;
};

// Logout User
const logout = async () => {
  try {
    // Get token to authorize the logout request
    const token = localStorage.getItem('accessToken');
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Call backend to invalidate refresh token
    await axios.post(`${API_URL}/logout`, {}, config);
  } catch (error) {
    console.error("Logout API Call failed:", error);
  } finally {
    // Always clean up Local Storage, even if API fails (e.g. server down)
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;