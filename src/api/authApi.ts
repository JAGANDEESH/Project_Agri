import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

// Register API
export const registerUser = async (data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, data);
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
};

// Login API
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data;
};

// ✅ Update Profile API
export const updateUserProfile = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, data);
    return response.data;
  } catch (err: any) {
    console.error('Update Profile Error:', err.response?.data || err.message);
    throw err;
  }
};
