import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, ChefHat, Star } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Mock recipe data for demonstration
    const mockRecipe = {
      id: id,
      name: "Chicken Biryani",
      category: "Main Course",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Aromatic rice dish with spices and chicken, a classic Indian delicacy that brings together fragrant basmati rice, tender chicken, and a blend of traditional spices.",
      cookTime: "45 mins",
      servings: "4-6",
      difficulty: "Medium",
      rating: 4.8,
      ingredients: [
        "2 cups Basmati rice",
        "500g Chicken, cut into pieces",
        "2 large Onions, sliced",
        "1 cup Yogurt",
        "2 tbsp Ginger-garlic paste",
        "1 tsp Red chili powder",
        "1/2 tsp Turmeric powder",
        "1 tsp Garam masala",
        "4-5 Green cardamom",
        "2 Bay leaves",
        "1 inch Cinnamon stick",
        "Salt to taste",
        "Oil for cooking",
        "Fresh mint leaves",
        "Fresh coriander leaves"
      ],
      instructions: [
        "Soak basmati rice in water for 30 minutes, then drain.",
        "Marinate chicken with yogurt, ginger-garlic paste, red chili powder, turmeric, and salt for 30 minutes.",
        "Heat oil in a heavy-bottomed pot and fry sliced onions until golden brown. Remove and set aside.",
        "In the same oil, add marinated chicken and cook until 70% done.",
        "Boil water with whole spices and salt. Add soaked rice and cook until 70% done.",
        "Layer the partially cooked rice over chicken. Sprinkle fried onions, mint, and coriander leaves.",
        "Cover with aluminum foil, then place the lid. Cook on high heat for 3-4 minutes, then reduce to low heat.",
        "Cook on low heat for 45 minutes. Turn off heat and let it rest for 10 minutes before opening.",
        "Gently mix and serve hot with raita and boiled eggs."
      ]
    };

    setTimeout(() => {
      setRecipe(mockRecipe);
      setLoading(false);
    }, 1000);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Recipe not found</p>
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
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Food Recipe
              </span>
            </Link>
            
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Recipes</span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Recipe Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                {recipe.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{recipe.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-gray-600 text-lg leading-relaxed">{recipe.description}</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{instruction}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Save Recipe
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300"
              >
                Share Recipe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RecipeDetail;