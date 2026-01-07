import axios from 'axios';
import config from '../config/config';

const API_URL = `${config.apiBaseUrl}/tours`;

// Get user tours
const getTours = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create new tour
const createTour = async (tourData, token) => {
  const response = await axios.post(API_URL, tourData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Because we upload a cover image
    },
  });
  return response.data;
};

// Delete tour
const deleteTour = async (tourId, token) => {
  const response = await axios.delete(`${API_URL}/${tourId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const tourService = {
  getTours,
  createTour,
  deleteTour,
};

export default tourService;