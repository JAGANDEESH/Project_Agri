// ✅ src/api/authApi.ts
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth'; // <== updated

export const registerUser = async (data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, data); // <== now matches backend route
    return response.data;
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
};
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data;
};