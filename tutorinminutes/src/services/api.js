import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Tutor Services
export const tutorService = {
  // Get all tutors with optional filters
  getTutors: async (filters = {}) => {
    try {
      const response = await api.get('/tutors', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching tutors:', error);
      throw error;
    }
  },

  // Get tutor by ID
  getTutorById: async (id) => {
    try {
      const response = await api.get(`/tutors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tutor:', error);
      throw error;
    }
  },

  // Search tutors
  searchTutors: async (query, filters = {}) => {
    try {
      const response = await api.get('/tutors/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching tutors:', error);
      throw error;
    }
  },

  // Get nearby tutors for offline mode
  getNearbyTutors: async (lat, lng, radius = 10) => {
    try {
      const response = await api.get('/tutors/nearby', {
        params: { lat, lng, radius }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby tutors:', error);
      throw error;
    }
  },

  // Check service availability in location
  checkServiceAvailability: async (lat, lng) => {
    try {
      const response = await api.post('/check-service', { lat, lng, mode: 'offline' });
      return response.data;
    } catch (error) {
      console.error('Error checking service availability:', error);
      throw error;
    }
  },
};

// Booking Services
export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user bookings
  getUserBookings: async () => {
    try {
      const response = await api.get('/bookings/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Get tutor availability
  getTutorAvailability: async (tutorId, date) => {
    try {
      const response = await api.get(`/tutors/${tutorId}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tutor availability:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },
};

// Authentication Services
export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return { token, user };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return { token, user };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
};

// Payment Services
export const paymentService = {
  // Create payment intent
  createPaymentIntent: async (amount, currency = 'usd') => {
    try {
      const response = await api.post('/payments/create-intent', {
        amount,
        currency,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, paymentMethodId) => {
    try {
      const response = await api.post('/payments/confirm', {
        paymentIntentId,
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  },
};

export default api;