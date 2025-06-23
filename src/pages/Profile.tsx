import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, Edit3, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile
      await updateProfile(formData);
      setSuccess(true);
      setIsEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setError('');
    setSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setError('');
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-5 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Notifications */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center"
            >
              <Check className="h-5 w-5 mr-2" />
              <span>Profile updated successfully!</span>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center"
            >
              <X className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 sm:p-8">
            <div className="flex items-center space-x-2">
              <motion.div 
                className="bg-white bg-opacity-20 p-3 rounded-full"
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-8 w-8" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-green-100 opacity-90">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name */}
              <motion.div
                custom={0}
                variants={itemVariants}
                className="relative group"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className="input input-name  pl-10 pr-4"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                custom={1}
                variants={itemVariants}
                className="relative group"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className="input input-name  pl-10 pr-4"
                  />
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                custom={2}
                variants={itemVariants}
                className="relative group"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input input-name  pl-10 pr-4  "
                  />
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                custom={3}
                variants={itemVariants}
                className="relative group"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MapPin className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 group-hover:border-gray-400"
                    placeholder="Enter your delivery address..."
                  />
                </div>
              </motion.div>

              {/* Account Type (Read-only) */}
              <motion.div
                custom={4}
                variants={itemVariants}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                custom={5}
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-4"
              >
                {!isEditing ? (
                  <motion.button
                    type="button"
                    onClick={handleEditClick}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="h-5 w-5 mr-2" />
                      Cancel
                    </motion.button>
                  </>
                )}
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};