import axios from 'axios';

// Base URL of your backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch routes
export const fetchRoutes = async () => {
  try {
    const response = await apiClient.get('/routes');
    console.log('API Response:', response.data);  // Add this line to log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};


// Function to add a new route
export const addRoute = async (route) => {
  try {
    const response = await apiClient.post('/routes', route);
    return response.data;
  } catch (error) {
    console.error('Error adding route:', error);
    throw error;
  }
};

// Export the API client for custom requests
export default apiClient;
