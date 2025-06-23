import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'admin',
    phone: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        password: formData.password
      });

      if (success) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };
useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 px-4 py-12 mt-[-10px]  ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center">
         
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-600 mt-1">Join us for fresh vegetables delivery</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="input input-name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="input input-name"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input input-name"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input input-name"
            >
              <option value="user">Customer</option>
              <option value="admin">Merchant</option>
            </select>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input input-name"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="input input-name"
            />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-md"
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
