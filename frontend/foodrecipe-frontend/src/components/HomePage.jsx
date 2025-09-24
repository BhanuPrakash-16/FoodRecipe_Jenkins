import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Search, Star, Users, Clock, X, Eye, EyeOff, Facebook, Twitter, Linkedin } from 'lucide-react';
import ImageScroller from './ImageScroller';
import apiService from '../services/api';

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, type, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const images = [
  "./him/1.jpg", "./him/2.jpg", "./him/3.jpg", "./him/4.jpg", "./him/5.jpg", "./him/6.jpg",
  "./him/7.jpg", "./him/8.jpg", "./him/9.jpg", "./him/10.jpg" 
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuth = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'signin') {
        // Validate required fields
        if (!formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return;
        }

        const email = formData.email.trim();
        const password = formData.password.trim();
        const response = await apiService.signIn(email, password);

        if (typeof response === 'string' && response.startsWith('200::')) {
          const token = (response.split('200::')[1] || '').trim();
          localStorage.setItem('authToken', token || 'demo-token');
          localStorage.setItem('userEmail', email);
          // Cache fullname from signup form if available
          if (formData.fullname && formData.fullname.trim()) {
            localStorage.setItem('fullName', formData.fullname.trim());
          } else {
            // Fetch fullname from backend using token and cache it
            try {
              const fullNameResp = await apiService.getFullName(token);
              if (typeof fullNameResp === 'string' && !fullNameResp.startsWith('401::')) {
                const name = fullNameResp.trim();
                if (name) localStorage.setItem('fullName', name);
              }
            } catch {}
          }
          navigate('/dashboard');
        } else if (typeof response === 'string' && response.startsWith('401::')) {
          const msg = response.split('401::')[1] || 'Invalid email or password';
          setError(msg);
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Sign up logic
        if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all required fields');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const response = await apiService.signUp({
          fullname: formData.fullname.trim(),
          email: formData.email.trim(),
          password: formData.password.trim()
        });

        if (typeof response === 'string' && response.startsWith('200::')) {
          setError('');
          setAuthMode('signin');
          // Cache fullname so dashboard can show it right after first login
          if (formData.fullname && formData.fullname.trim()) {
            localStorage.setItem('fullName', formData.fullname.trim());
          }
          // Clear form
          setFormData({
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } else if (typeof response === 'string' && response.startsWith('401::')) {
          const msg = response.split('401::')[1] || 'Sign up failed';
          setError(msg);
        } else {
          setError('Sign up failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchClick = () => {
    alert("Please sign in to search for recipes 🍽️");
  };

  return (
    <div className="min-h-screen">
      {/* Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Food Recipe
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <span>Sign In</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative animated blobs */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.span
            initial={{ y: 10 }}
            animate={{ y: -10 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-orange-200 opacity-40 blur-3xl"
          />
          <motion.span
            initial={{ y: -8 }}
            animate={{ y: 8 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-red-200 opacity-40 blur-3xl"
          />
          <motion.span
            initial={{ x: -6 }}
            animate={{ x: 6 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-orange-100 opacity-60 blur-3xl"
          />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  INDIA'S #1
                </span>
                <br />
                <span className="text-gray-800">FOOD RECIPE APP</span>
              </h1>
            </motion.div>

            {/* Subtle glow ring */}
            <div className="relative mx-auto mt-6 mb-2 h-1">
              <div className="absolute left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-orange-300 to-red-300 blur-3xl opacity-30" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
              className="text-xl md:text-2xl text-gray-600 mb-4"
            >
              Welcome To Food Recipe <span className="text-orange-500">App! 🍽️</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              <span className="text-orange-500 font-semibold">Discover</span>, save, and share delicious recipes with{' '}
              <span className="text-orange-500 font-semibold">a community of food lovers.</span>
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl">
                <input
                  type="text"
                  placeholder='Search "recipes"'
                  className="flex-1 px-6 py-4 text-lg border-none outline-none rounded-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearchClick}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                  <span>Search Recipes</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800">10K+</h3>
                  <p className="text-gray-600">Premium Recipes</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800">50K+</h3>
                  <p className="text-gray-600">Happy Users</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800">24/7</h3>
                  <p className="text-gray-600">Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Scroller Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore Our <span className="text-orange-500">Delicious</span> Collection
            </h2>
            <p className="text-xl text-gray-600">From traditional Indian cuisine to international favorites</p>
          </motion.div>
          
          <ImageScroller images={images} speed="15s" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">Food Recipe</span>
            </div>
            
            <p className="text-gray-400 mb-8">
              Copyright © 2025. All rights reserved.
            </p>
            
            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/kotarumohitsaiadarsh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {authMode === 'signin' && (
                  <div className="text-right">
                    <button
                      onClick={async () => {
                        if (!formData.email.trim()) {
                          setError('Enter your email to recover password');
                          return;
                        }
                        setIsLoading(true);
                        setError('');
                        try {
                          const resp = await apiService.forgotPassword(formData.email.trim());
                          if (typeof resp === 'string' && resp.startsWith('200::')) {
                            showToast('Password has been sent to your registered email.', 'success');
                          } else if (typeof resp === 'string' && resp.startsWith('401::')) {
                            const msg = resp.split('401::')[1] || 'Email not registered';
                            setError(msg);
                            showToast(msg, 'error');
                          } else {
                            setError('Failed to send password');
                            showToast('Failed to send password', 'error');
                          }
                        } catch (e) {
                          setError('Failed to send password');
                          showToast('Failed to send password', 'error');
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  onClick={handleAuth}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    authMode === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </motion.button>

                <div className="text-center">
                  <span className="text-gray-600">
                    {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;