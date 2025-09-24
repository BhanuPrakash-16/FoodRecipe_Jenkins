import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, ChefHat, Star, Play, MessageCircle, ThumbsUp } from 'lucide-react';
import recipesData from './FoodItems';
import ingredientsData from '../data/ingredientsData';
import recipeProcedures from '../data/recipeProcedures';


const Cb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const localKey = `recipe-rating-${id}`;
  const commentsKey = `recipe-comments-${id}`;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchApiRecipe = async (mealId) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          setRecipe({
            id: id,
            name: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            description: `${meal.strCategory} | ${meal.strArea}`,
            videoUrl: meal.strYoutube ? meal.strYoutube.replace('watch?v=', 'embed/') : null,
            procedure: meal.strInstructions,
            ingredients: extractIngredients(meal),
            cookTime: "45 mins",
            servings: "4-6",
            difficulty: "Medium"
          });
        } else {
          setError("Recipe not found");
        }
      } catch {
        setError("Failed to fetch recipe from API");
      } finally {
        setLoading(false);
      }
    };

    if (id.startsWith("API")) {
      fetchApiRecipe(id.slice(3));
    } else {
      const localRecipe = recipesData.find(item => item.id.toString() === id);
      if (localRecipe) {
       setRecipe({
          ...localRecipe,
          ingredients: ingredientsData[localRecipe.ingredientsId],
          procedure: recipeProcedures[localRecipe.procedureId],
          cookTime: "45 mins",
          servings: "4-6",
          difficulty: "Medium"
        });

        setLoading(false);
      } else {
        setError("Recipe not found");
        setLoading(false);
      }
    }
  }, [id, navigate]);

  // Helper function to extract ingredients from API meal data
  const extractIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  useEffect(() => {
    if (!recipe) return;

    const storedRatings = JSON.parse(localStorage.getItem(localKey)) || [];
    if (Array.isArray(storedRatings)) {
      setAllRatings(storedRatings);
      if (storedRatings.length) {
        const avg = storedRatings.reduce((sum, val) => sum + val, 0) / storedRatings.length;
        setAverageRating(avg.toFixed(1));
      }
    }

    const storedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    if (Array.isArray(storedComments)) {
      setComments(storedComments);
    }
  }, [recipe, localKey, commentsKey]);

  const handleRatingChange = (newRating) => {
    if (userRating > 0) return;

    const updatedRatings = [...allRatings, newRating];
    localStorage.setItem(localKey, JSON.stringify(updatedRatings));
    setAllRatings(updatedRatings);
    setUserRating(newRating);

    const avg = updatedRatings.reduce((sum, val) => sum + val, 0) / updatedRatings.length;
    setAverageRating(avg.toFixed(1));
  };

  const handleResetRating = () => {
    const updatedRatings = allRatings.filter(r => r !== userRating);
    localStorage.setItem(localKey, JSON.stringify(updatedRatings));
    setAllRatings(updatedRatings);
    setUserRating(0);
    if (updatedRatings.length > 0) {
      const avg = updatedRatings.reduce((sum, val) => sum + val, 0) / updatedRatings.length;
      setAverageRating(avg.toFixed(1));
    } else {
      setAverageRating(0);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newEntry = {
        id: Date.now(),
        text: newComment.trim(),
        time: new Date().toISOString(),
      };
      const updatedComments = [...comments, newEntry];
      setComments(updatedComments);
      localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
      setNewComment('');
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = () => {
    const updated = comments.map(comment =>
      comment.id === editingCommentId ? { ...comment, text: editedText } : comment
    );
    setComments(updated);
    localStorage.setItem(commentsKey, JSON.stringify(updated));
    setEditingCommentId(null);
    setEditedText('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedText('');
  };

  const handleDelete = (id) => {
    const updated = comments.filter(comment => comment.id !== id);
    setComments(updated);
    localStorage.setItem(commentsKey, JSON.stringify(updated));
  };

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

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "Recipe not found"}</p>
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
                  <span>{averageRating || "No ratings"}</span>
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

            {/* Video Section */}
            {recipe.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Play className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Watch Video Tutorial</h2>
                </div>
                <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={recipe.videoUrl}
                    title={recipe.name}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}

            {/* Recipe Instructions */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
                <div className="space-y-3">
                  {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </motion.div>
                  )) : (
                    <div className="text-gray-500 italic">
                      Ingredients not available for this recipe
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
                {recipe.procedure ? (
                  <div className="space-y-4">
                    {recipe.procedure.split('\n').filter(step => step.trim()).map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{instruction.trim()}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">
                    Instructions not available for this recipe
                  </div>
                )}
              </motion.div>
            </div>

            {/* Rating Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl"
            >
              <div className="flex items-center space-x-2 mb-4">
                <ThumbsUp className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-800">Rate this Recipe</h2>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-3xl transition-colors ${
                        (hoverRating || userRating || averageRating) >= star 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      } ${userRating > 0 ? 'cursor-default' : 'cursor-pointer hover:text-yellow-500'}`}
                      onMouseEnter={() => !userRating && setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingChange(star)}
                      disabled={userRating > 0}
                    >
                      ★
                    </motion.button>
                  ))}
                </div>
                
                {averageRating > 0 && (
                  <div className="text-gray-600">
                    {userRating > 0
                      ? `You rated this ${userRating} out of 5`
                      : `Average: ${averageRating} from ${allRatings.length} rating(s)`}
                  </div>
                )}
              </div>

              {userRating > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetRating}
                  className="bg-white text-orange-500 border border-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                >
                  Reset My Rating
                </motion.button>
              )}
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this recipe..."
                  className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  rows="3"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Post Comment
                </motion.button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      {editingCommentId === comment.id ? (
                        <div>
                          <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            rows="3"
                          />
                          <div className="flex space-x-2 mt-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                            >
                              Save
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleCancelEdit}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-700 mb-2">{comment.text}</p>
                          <div className="flex justify-between items-center">
                            <small className="text-gray-500">
                              {new Date(comment.time).toLocaleString()}
                            </small>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(comment)}
                                className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(comment.id)}
                                className="text-red-500 hover:text-red-600 font-medium text-sm"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4"
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

export default Cb;