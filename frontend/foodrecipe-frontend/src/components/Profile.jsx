import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Calendar, Edit3, Save, X, Camera, Shield, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    fullname: '',
    email: ''
  });

  useEffect(() => {
    const token = (localStorage.getItem('authToken') || '').trim();
    if (!token) {
      navigate('/');
      return;
    }

    const loadUserData = async () => {
      try {
        const cachedFullName = (localStorage.getItem('fullName') || '').trim();
        const userEmail = (localStorage.getItem('userEmail') || '').trim();
        
        if (cachedFullName && userEmail) {
          setUser({
            name: cachedFullName,
            email: userEmail,
            joinDate: new Date().toLocaleDateString(),
            recipesCount: Math.floor(Math.random() * 50) + 10,
            favoritesCount: Math.floor(Math.random() * 30) + 5
          });
          setEditData({
            fullname: cachedFullName,
            email: userEmail
          });
        } else {
          // Fetch from backend
          const response = await apiService.getFullName(token);
          if (typeof response === 'string' && !response.startsWith('401::')) {
            const name = response.trim();
            setUser({
              name: name,
              email: userEmail || 'user@example.com',
              joinDate: new Date().toLocaleDateString(),
              recipesCount: Math.floor(Math.random() * 50) + 10,
              favoritesCount: Math.floor(Math.random() * 30) + 5
            });
            setEditData({
              fullname: name,
              email: userEmail || 'user@example.com'
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser({
          name: 'User',
          email: 'user@example.com',
          joinDate: new Date().toLocaleDateString(),
          recipesCount: 0,
          favoritesCount: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      fullname: user.name,
      email: user.email
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({
        ...prev,
        name: editData.fullname,
        email: editData.email
      }));
      
      localStorage.setItem('fullName', editData.fullname);
      localStorage.setItem('userEmail', editData.email);
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Unable to load profile</p>
          <Link to="/dashboard" className="text-orange-500 hover:text-orange-600 font-medium">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
              <span className="text-xl font-semibold text-gray-800">Back to Dashboard</span>
            </Link>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 bg-white text-orange-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                </motion.div>

                {/* User Info */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                  <p className="text-white/90 text-lg">{user.email}</p>
                  <p className="text-white/70 text-sm mt-1">Member since {user.joinDate}</p>
                </div>

                {/* Edit Button */}
                <div className="ml-auto">
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEdit}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Saving...' : 'Save'}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullname"
                          value={editData.fullname}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="h-5 w-5 text-orange-500" />
                          <span className="text-gray-800">{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-5 w-5 text-orange-500" />
                          <span className="text-gray-800">{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        <span className="text-gray-800">{user.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Activity</h3>
                  
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-orange-500 p-3 rounded-full">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Recipes Explored</p>
                            <p className="text-2xl font-bold text-gray-800">{user.recipesCount}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-500 p-3 rounded-full">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Favorites Saved</p>
                            <p className="text-2xl font-bold text-gray-800">{user.favoritesCount}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
