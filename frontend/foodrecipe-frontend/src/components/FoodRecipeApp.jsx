import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const localRecipes = [
  // Indian Dishes
  { id: "L1", name: "Chicken Biryani", category: "Main Course", image: "/FoodRecipe/itm/1.jpg", description: "Aromatic rice dish with spices and chicken." },
  { id: "L2", name: "Paneer Butter Masala", category: "Main Course", image: "/FoodRecipe/itm/2.jpg", description: "Creamy tomato-based paneer curry." },
  { id: "L3", name: "Gulab Jamun", category: "Dessert", image: "/FoodRecipe/itm/3.jpg", description: "Sweet fried dumplings soaked in sugar syrup." },
  { id: "L4", name: "Vada Pav", category: "Snacks", image: "/FoodRecipe/itm/4.jpg", description: "Mumbai-style spicy potato fritter in a bun." },
  { id: "L5", name: "Butter Chicken", category: "Main Course", image: "/FoodRecipe/itm/5.jpg", description: "Delicious creamy butter chicken curry." },
  { id: "L6", name: "Dhokla", category: "Snacks", image: "/FoodRecipe/itm/6.jpg", description: "Steamed savory cake made from rice and chickpea flour." },
  { id: "L7", name: "Kheer", category: "Dessert", image: "/FoodRecipe/itm/7.jpg", description: "Indian rice pudding made with milk, rice, and cardamom." },
  { id: "L8", name: "Masala Dosa", category: "Snacks", image: "/FoodRecipe/itm/8.jpg", description: "Crispy South Indian dosa stuffed with spiced potatoes." },
  { id: "L9", name: "Pani Puri", category: "Snacks", image: "/FoodRecipe/itm/9.jpg", description: "Crispy puris filled with spicy and tangy water." },
  { id: "L10", name: "Rajma Chawal", category: "Main Course", image: "/FoodRecipe/itm/10.jpg", description: "Kidney beans curry served with steamed rice." },

  // Italian Dishes
  { id: "L11", name: "Margherita Pizza", category: "Main Course", image:"/FoodRecipe/itm/11.jpg" , description: "Classic Italian pizza with tomato, mozzarella, and basil." },
  { id: "L12", name: "Pasta Carbonara", category: "Main Course", image:"/FoodRecipe/itm/12.jpg", description: "Creamy pasta with eggs, cheese, pancetta, and pepper." },
  { id: "L13", name: "Lasagna", category: "Main Course", image:"/FoodRecipe/itm/13.jpg", description: "Layered pasta with meat sauce, ricotta, and cheese." },
  { id: "L14", name: "Tiramisu", category: "Dessert", image:"/FoodRecipe/itm/14.jpg", description: "Coffee-flavored Italian dessert with mascarpone and cocoa." },
  { id: "L15", name: "Risotto", category: "Main Course", image: "/FoodRecipe/itm/15.jpg", description: "Creamy rice dish cooked with broth, butter, and cheese." },
  { id: "L16", name: "Bruschetta", category: "Snacks", image: "/FoodRecipe/itm/16.jpg", description: "Grilled bread topped with tomatoes, basil, and garlic." },
  { id: "L17", name: "Minestrone Soup", category: "Starter", image: "/FoodRecipe/itm/17.jpg", description: "Traditional Italian vegetable soup with pasta or rice." },
  { id: "L18", name: "Blueberry Cheesecake", category: "Dessert", image: "/FoodRecipe/itm/18.jpg", description: "Creamy cheesecake layered with fresh blueberries and a buttery graham cracker crust." },
  { id: "L19", name: "Panna Cotta", category: "Dessert", image: "/FoodRecipe/itm/19.jpg", description: "Creamy Italian dessert made with sweetened cream and gelatin." },
  { id: "L20", name: "Caprese Salad", category: "Starter", image: "/FoodRecipe/itm/20.jpg", description: "Fresh salad with mozzarella, tomatoes, basil, and olive oil." },

  // Mexican Dishes
  { id: "L21", name: "Tacos", category: "Main Course", image: "/FoodRecipe/itm/21.jpg" , description: "Corn tortillas filled with meat, veggies, and salsa." },
  { id: "L22", name: "Chicken Drumstick", category: "Starter", image: "/FoodRecipe/itm/22.jpg" , description: "Juicy chicken drumsticks marinated in spices and grilled to crispy perfection." },
  { id: "L23", name: "Enchiladas", category: "Main Course", image: "/FoodRecipe/itm/23.jpg" , description: "Rolled tortillas filled with meat and covered in sauce." },
  { id: "L24", name: "Churros", category: "Dessert", image: "/FoodRecipe/itm/24.jpg" , description: "Fried dough pastries coated in cinnamon sugar." },
  { id: "L25", name: "Quesadilla", category: "Snacks", image: "/FoodRecipe/itm/25.jpg" , description: "Grilled tortilla filled with melted cheese and veggies." },

  // Mediterranean Dishes
  { id: "L26", name: "Hummus", category: "Snacks", image: "/FoodRecipe/itm/26.jpg", description: "Chickpea dip blended with tahini, lemon, and garlic." },
  { id: "L27", name: "Greek Salad", category: "Starter", image: "/FoodRecipe/itm/27.jpg", description: "Salad with cucumbers, tomatoes, olives, and feta cheese." },
  { id: "L28", name: "Falafel", category: "Snacks", image: "/FoodRecipe/itm/28.jpg", description: "Crispy chickpea fritters served with tahini sauce." },
  { id: "L29", name: "Shawarma", category: "Main Course", image: "/FoodRecipe/itm/29.jpg", description: "Grilled marinated meat wrapped in pita bread." },
  { id: "L30", name: "Baklava", category: "Dessert", image: "/FoodRecipe/itm/30.jpg", description: "Layered pastry filled with nuts and sweet syrup." }
];

// const localRecipes = [
//   // Indian Dishes
//   { id: "L1", name: "Chicken Biryani", category: "Main Course", image: "/itm/1.jpg", description: "Aromatic rice dish with spices and chicken." },
//   { id: "L2", name: "Paneer Butter Masala", category: "Main Course", image: "/itm/2.jpg", description: "Creamy tomato-based paneer curry." },
//   { id: "L3", name: "Gulab Jamun", category: "Dessert", image: "/itm/3.jpg", description: "Sweet fried dumplings soaked in sugar syrup." },
//   { id: "L4", name: "Vada Pav", category: "Snacks", image: "/itm/4.jpg", description: "Mumbai-style spicy potato fritter in a bun." },
//   { id: "L5", name: "Butter Chicken", category: "Main Course", image: "/itm/5.jpg", description: "Delicious creamy butter chicken curry." },
//   { id: "L6", name: "Dhokla", category: "Snacks", image: "/itm/6.jpg", description: "Steamed savory cake made from rice and chickpea flour." },
//   { id: "L7", name: "Kheer", category: "Dessert", image: "/itm/7.jpg", description: "Indian rice pudding made with milk, rice, and cardamom." },
//   { id: "L8", name: "Masala Dosa", category: "Snacks", image: "/itm/8.jpg", description: "Crispy South Indian dosa stuffed with spiced potatoes." },
//   { id: "L9", name: "Pani Puri", category: "Snacks", image: "/itm/9.jpg", description: "Crispy puris filled with spicy and tangy water." },
//   { id: "L10", name: "Rajma Chawal", category: "Main Course", image: "/itm/10.jpg", description: "Kidney beans curry served with steamed rice." },

//   // Italian Dishes
//   { id: "L11", name: "Margherita Pizza", category: "Main Course", image:"/itm/11.jpg" , description: "Classic Italian pizza with tomato, mozzarella, and basil." },
//   { id: "L12", name: "Pasta Carbonara", category: "Main Course", image:"/itm/12.jpg", description: "Creamy pasta with eggs, cheese, pancetta, and pepper." },
//   { id: "L13", name: "Lasagna", category: "Main Course", image:"/itm/13.jpg", description: "Layered pasta with meat sauce, ricotta, and cheese." },
//   { id: "L14", name: "Tiramisu", category: "Dessert", image:"/itm/14.jpg", description: "Coffee-flavored Italian dessert with mascarpone and cocoa." },
//   { id: "L15", name: "Risotto", category: "Main Course", image: "/itm/15.jpg", description: "Creamy rice dish cooked with broth, butter, and cheese." },
//   { id: "L16", name: "Bruschetta", category: "Snacks", image: "/itm/16.jpg", description: "Grilled bread topped with tomatoes, basil, and garlic." },
//   { id: "L17", name: "Minestrone Soup", category: "Starter", image: "/itm/17.jpg", description: "Traditional Italian vegetable soup with pasta or rice." },
//   { id: "L18", name: "Blueberry Cheesecake", category: "Dessert", image: "/itm/18.jpg", description: "Creamy cheesecake layered with fresh blueberries and a buttery graham cracker crust." },
//   { id: "L19", name: "Panna Cotta", category: "Dessert", image: "/itm/19.jpg", description: "Creamy Italian dessert made with sweetened cream and gelatin." },
//   { id: "L20", name: "Caprese Salad", category: "Starter", image: "/itm/20.jpg", description: "Fresh salad with mozzarella, tomatoes, basil, and olive oil." },

//   // Mexican Dishes
//   { id: "L21", name: "Tacos", category: "Main Course", image: "/itm/21.jpg" , description: "Corn tortillas filled with meat, veggies, and salsa." },
//   { id: "L22", name: "Chicken Drumstick", category: "Starter", image: "/itm/22.jpg" , description: "Juicy chicken drumsticks marinated in spices and grilled to crispy perfection." },
//   { id: "L23", name: "Enchiladas", category: "Main Course", image: "/itm/23.jpg" , description: "Rolled tortillas filled with meat and covered in sauce." },
//   { id: "L24", name: "Churros", category: "Dessert", image: "/itm/24.jpg" , description: "Fried dough pastries coated in cinnamon sugar." },
//   { id: "L25", name: "Quesadilla", category: "Snacks", image: "/itm/25.jpg" , description: "Grilled tortilla filled with melted cheese and veggies." },

//   // Mediterranean Dishes
//   { id: "L26", name: "Hummus", category: "Snacks", image: "/itm/26.jpg", description: "Chickpea dip blended with tahini, lemon, and garlic." },
//   { id: "L27", name: "Greek Salad", category: "Starter", image: "/itm/27.jpg", description: "Salad with cucumbers, tomatoes, olives, and feta cheese." },
//   { id: "L28", name: "Falafel", category: "Snacks", image: "/itm/28.jpg", description: "Crispy chickpea fritters served with tahini sauce." },
//   { id: "L29", name: "Shawarma", category: "Main Course", image: "/itm/29.jpg", description: "Grilled marinated meat wrapped in pita bread." },
//   { id: "L30", name: "Baklava", category: "Dessert", image: "/itm/30.jpg", description: "Layered pastry filled with nuts and sweet syrup." }
// ];


const categories = ["All", "Main Course", "Dessert", "Snacks", "Starter"];

const RecipeApp = () => {
  const [apiRecipes, setApiRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [loading, setLoading] = useState(true);

  const recipesPerPage = 12;

  useEffect(() => {
    const fetchAllMeals = async () => {
      setError(null);
      setLoading(true);
      try {
        const fetches = [];
        for (let i = 97; i <= 122; i++) {
          const letter = String.fromCharCode(i);
          fetches.push(fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`));
        }
        const responses = await Promise.all(fetches);
        const dataArr = await Promise.all(responses.map(res => res.json()));
        
        let allMeals = [];
        dataArr.forEach(data => {
          if (data.meals) {
            const mappedMeals = data.meals.map(meal => ({
              id: "API" + meal.idMeal,
              name: meal.strMeal,
              category: meal.strCategory,
              image: meal.strMealThumb,
              description: meal.strTags
                ? meal.strTags.replace(/,/g, ", ")
                : "Delicious recipe from our global collection.",
            }));
            allMeals = allMeals.concat(mappedMeals);
          }
        });
        setApiRecipes(allMeals);
      } catch (err) {
        setError("Failed to load API meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, []);

  // Combine local and API recipes
  const combinedRecipes = [...localRecipes, ...apiRecipes];

  // Filter recipes by category and search query
  const filteredRecipes = combinedRecipes.filter(recipe =>
    (selectedCategory === "All" || recipe.category === selectedCategory) &&
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Authentic Recipes For Modern Kitchen
        </h2>
        <p className="text-gray-600">Explore our curated collection of delicious recipes</p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Category Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Loading State - skeleton cards */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton w-full h-48" />
              <div className="p-6 space-y-3">
                <div className="skeleton h-5 w-3/4 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link to={`/recipe/${recipe.id}`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.03, rotate: -0.2 }}
                    whileTap={{ scale: 0.99 }}
                    className="card hover-glow overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {recipe.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                        {recipe.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No recipes found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pageNum === currentPage
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                {pageNum}
              </motion.button>
            );
          })}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default RecipeApp;