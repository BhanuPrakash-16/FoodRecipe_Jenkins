import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings as SettingsIcon, Bell, Shield, Palette, Globe, Moon, Sun, Volume2, VolumeX, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    recipeUpdates: true,
    weeklyDigest: false,
    
    // Appearance
    theme: 'light',
    language: 'en',
    fontSize: 'medium',
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    
    // Audio
    soundEffects: true,
    volume: 70,
    
    // Advanced
    autoSave: true,
    dataCollection: false,
    analytics: true
  });

  useEffect(() => {
    // Simulate loading user settings
    const loadSettings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Load from localStorage or API
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        emailNotifications: true,
        pushNotifications: true,
        recipeUpdates: true,
        weeklyDigest: false,
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        profileVisibility: 'public',
        showEmail: false,
        showActivity: true,
        soundEffects: true,
        volume: 70,
        autoSave: true,
        dataCollection: false,
        analytics: true
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
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
              Settings
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
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-500 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
                    <p className="text-gray-600">Receive updates via email</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.emailNotifications ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.emailNotifications ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Push Notifications</h3>
                    <p className="text-gray-600">Receive browser notifications</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.pushNotifications ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.pushNotifications ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recipe Updates</h3>
                    <p className="text-gray-600">Get notified about new recipes</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('recipeUpdates', !settings.recipeUpdates)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.recipeUpdates ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.recipeUpdates ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Weekly Digest</h3>
                    <p className="text-gray-600">Receive weekly recipe summaries</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('weeklyDigest', !settings.weeklyDigest)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.weeklyDigest ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.weeklyDigest ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-500 p-3 rounded-full">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Appearance</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Theme</h3>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('theme', 'light')}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        settings.theme === 'light'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Sun className="h-5 w-5" />
                      <span>Light</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        settings.theme === 'dark'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Moon className="h-5 w-5" />
                      <span>Dark</span>
                    </motion.button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Language</h3>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Font Size</h3>
                  <div className="flex space-x-4">
                    {['small', 'medium', 'large'].map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSettingChange('fontSize', size)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 capitalize ${
                          settings.fontSize === size
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-500 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Privacy & Security</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Profile Visibility</h3>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Show Email</h3>
                    <p className="text-gray-600">Display email on profile</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('showEmail', !settings.showEmail)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.showEmail ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.showEmail ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Show Activity</h3>
                    <p className="text-gray-600">Display recent activity</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('showActivity', !settings.showActivity)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.showActivity ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.showActivity ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Audio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-500 p-3 rounded-full">
                  {settings.soundEffects ? <Volume2 className="h-6 w-6 text-white" /> : <VolumeX className="h-6 w-6 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Audio</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Sound Effects</h3>
                    <p className="text-gray-600">Play sounds for interactions</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSettingChange('soundEffects', !settings.soundEffects)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      settings.soundEffects ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.soundEffects ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Volume</h3>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-semibold">{settings.volume}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
