import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, LogOut, Search, Filter, ArrowUp, User, Settings, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FoodRecipeApp from './FoodRecipeApp';
import apiService from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const token = (localStorage.getItem('authToken') || '').trim();
    if (!token) {
      navigate('/');
    } else {
      const cachedFullName = (localStorage.getItem('fullName') || '').trim();
      if (cachedFullName) {
        setUser({ name: cachedFullName });
      }
      // Fetch full name from backend using token
      (async () => {
        try {
          const response = await apiService.getFullName(token);
          if (typeof response === 'string' && response.startsWith('401::')) {
            // Fallback to email prefix if available
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
              setUser({ name: userEmail.split('@')[0] });
            } else {
              setUser({ name: 'User' });
            }
          } else if (typeof response === 'string') {
            const name = response.trim();
            setUser({ name });
            if (name) localStorage.setItem('fullName', name);
          } else {
            setUser({ name: 'User' });
          }
        } catch (e) {
          const userEmail = localStorage.getItem('userEmail');
          if (userEmail) {
            setUser({ name: userEmail.split('@')[0] });
          } else {
            setUser({ name: 'User' });
          }
        }
      })();
    }
  }, [navigate]);

  // Scroll event listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (!user) return null;

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
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Food Recipe
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Profile dropdown */}
              <div className="relative profile-dropdown">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full shadow-md"
                  >
                    <User className="h-4 w-4 text-white" />
                  </motion.div>
                  <span className="text-gray-700 font-medium">Welcome, {user.name}!</span>
                  <motion.div
                    animate={{ rotate: showProfileDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Profile Info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">Food Recipe User</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link to="/profile">
                          <motion.button
                            whileHover={{ backgroundColor: "#fef3f2" }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            <User className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Profile</span>
                          </motion.button>
                        </Link>

                        <Link to="/settings">
                          <motion.button
                            whileHover={{ backgroundColor: "#fef3f2" }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            <Settings className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Settings</span>
                          </motion.button>
                        </Link>

                        <div className="border-t border-gray-100 my-1"></div>

                        <motion.button
                          whileHover={{ backgroundColor: "#fef2f2" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Back to top button - only visible when scrolled down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            The World Of <span className="text-orange-500">Recipes</span>
          </h1>
          <p className="text-xl text-gray-600">Discover amazing recipes from around the globe</p>
        </motion.div>

        <FoodRecipeApp />
      </main>
    </div>
  );
};

export default Dashboard;