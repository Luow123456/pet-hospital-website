import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User APIs
export const userApi = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (userData) => api.post('/users/register', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

// Doctor APIs
export const doctorApi = {
  getDoctors: () => api.get('/doctors'),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
};

// Appointment APIs
export const appointmentApi = {
  getAppointments: () => api.get('/appointments'),
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
};

// Pet Records APIs
export const petRecordApi = {
  getPets: () => api.get('/pets'),
  createPet: (petData) => api.post('/pets', petData),
  updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
  deletePet: (id) => api.delete(`/pets/${id}`),
  getRecords: (petId) => api.get(`/pets/${petId}/records`),
};

// Consultation APIs
export const consultationApi = {
  getConsultations: () => api.get('/consultations'),
  createConsultation: (consultationData) => api.post('/consultations', consultationData),
  replyConsultation: (id, reply) => api.post(`/consultations/${id}/reply`, { reply }),
};

// Shop APIs
export const shopApi = {
  getProducts: () => api.get('/shop/products'),
  getProductById: (id) => api.get(`/shop/products/${id}`),
  createOrder: (orderData) => api.post('/shop/orders', orderData),
  getOrders: () => api.get('/shop/orders'),
};

export default api;
