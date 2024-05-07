// src/services/auth.js
import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('/api/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const register = async (email, password) => {
  const response = await axios.post('/api/auth/register', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem('token');
};
