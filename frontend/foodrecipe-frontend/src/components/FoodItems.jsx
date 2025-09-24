
const recipesData = [
  {
    id: "L1",
    name: "Chicken Biryani",
    category: "Main Course",
    image: "/FoodRecipe/itm/1.jpg",
    description: "Aromatic rice dish with spices and chicken.",
    ingredientsId: "I1",
    procedureId: "P1",
    videoUrl: "https://www.youtube.com/embed/kHjkXysXChw"
  },
  {
    id: "L2",
    name: "Paneer Butter Masala",
    category: "Main Course",
    image: "/FoodRecipe/itm/2.jpg",  
    description: "Creamy tomato-based paneer curry.",
    ingredientsId: "I2",
    procedureId: "P2",
    videoUrl: "https://www.youtube.com/embed/U1LVDFwi8qI"
  },
  {
    id: "L3",
    name: "Gulab Jamun",
    category: "Dessert",
    image: "/FoodRecipe/itm/3.jpg",
    description: "Sweet fried dumplings soaked in sugar syrup.",
    ingredientsId: "I3",
    procedureId: "P3",
    videoUrl: "https://www.youtube.com/embed/0aWWwKSEzw4"
  },
  {
    id: "L4",
    name: "Vada Pav",
    category: "Snacks",
    image: "/FoodRecipe/itm/4.jpg",
    description: "Mumbai-style spicy potato fritter in a bun.",
    ingredientsId: "I4",
    procedureId: "P4",
    videoUrl: "https://www.youtube.com/embed/bhE1_h4liH0"
  },
  {
    id: "L5",
    name: "Butter Chicken",
    category: "Main Course",
    image: "/FoodRecipe/itm/5.jpg",
    description: "Delicious creamy butter chicken curry.",
    ingredientsId: "I5",
    procedureId: "P5",
    videoUrl: "https://www.youtube.com/embed/1cXAZ98hKfU"
  },
  {
    id: "L6",
    name: "Dhokla",
    category: "Snacks",
    image: "/FoodRecipe/itm/6.jpg",
    description: "Steamed savory cake made from rice and chickpea flour.",
    ingredientsId: "I6",
    procedureId: "P6",
    videoUrl: "https://www.youtube.com/embed/-Qy4fuNy8kI"
  },
  {
    id: "L7",
    name: "Kheer",
    category: "Dessert",
    image: "/FoodRecipe/itm/7.jpg",
    description: "Indian rice pudding made with milk, rice, and cardamom.",
    ingredientsId: "I7",
    procedureId: "P7",
    videoUrl: "https://www.youtube.com/embed/835sLyEmqSI"
  },
  {
    id: "L8",
    name: "Masala Dosa",
    category: "Snacks",
    image: "/FoodRecipe/itm/8.jpg",
    description: "Crispy South Indian dosa stuffed with spiced potatoes.",
    ingredientsId: "I8",
    procedureId: "P8",
    videoUrl: "https://www.youtube.com/embed/J75VQSxOtdo"
  },
  {
    id: "L9",
    name: "Pani Puri",
    category: "Snacks",
    image: "/FoodRecipe/itm/9.jpg",
    description: "Crispy puris filled with spicy and tangy water.",
    ingredientsId: "I9",
    procedureId: "P9",
    videoUrl: "https://www.youtube.com/embed/z1b4p7lmnCY"
  },
  {
    id: "L10",
    name: "Rajma Chawal",
    category: "Main Course",
    image: "/FoodRecipe/itm/10.jpg",
    description: "Kidney beans curry served with steamed rice.",
    ingredientsId: "I10",
    procedureId: "P10",
    videoUrl: "https://www.youtube.com/embed/nnvk38T-iq8"
  },
  // Italian Dishes
  {
    id: "L11",
    name: "Margherita Pizza",
    category: "Main Course",
    image: "/FoodRecipe/itm/11.jpg",
    description: "Classic Italian pizza with tomato, mozzarella, and basil.",
     ingredientsId: "I11",
    procedureId: "P11",
    videoUrl: "https://www.youtube.com/embed/xdshDFwu9x4"
  },
  {
    id: "L12",
    name: "Pasta Carbonara",
    category: "Main Course",
    image: "/FoodRecipe/itm/12.jpg",
    description: "Creamy pasta with eggs, cheese, pancetta, and pepper.",
    ingredientsId: "I12",
    procedureId: "P12",
    videoUrl: "https://www.youtube.com/embed/Mprr5Q5Z7H4"
  },
  {
    id: "L13",
    name: "Lasagna",
    category: "Main Course",
    image: "/FoodRecipe/itm/13.jpg",
    description: "Layered pasta with meat sauce, ricotta, and cheese.",
    ingredientsId: "I13",
    procedureId: "P13",
    videoUrl: "https://www.youtube.com/embed/XjozbaVFTS4"
  },
  {
    id: "L14",
    name: "Tiramisu",
    category: "Dessert",
    image: "/FoodRecipe/itm/14.jpg",
    description: "Coffee-flavored Italian dessert with mascarpone and cocoa.",
    ingredientsId: "I14",
    procedureId: "P14",
    videoUrl: "https://www.youtube.com/embed/7VTtenyKRg4"
  },
  {
    id: "L15",
    name: "Risotto",
    category: "Main Course",
    image: "/FoodRecipe/itm/15.jpg",
    description: "Creamy rice dish cooked with broth, butter, and cheese.",
    ingredientsId: "I15",
    procedureId: "P15",
    videoUrl: "https://www.youtube.com/embed/eYIMIP2dIpE"
  },
  {
    id: "L16",
    name: "Bruschetta",
    category: "Snacks",
    image: "/FoodRecipe/itm/16.jpg",
    description: "Grilled bread topped with tomatoes, basil, and garlic.",
    ingredientsId: "I16",
    procedureId: "P16",
    videoUrl: "https://www.youtube.com/embed/Q3xg35pcLyo"
  },
  {
    id: "L17",
    name: "Minestrone Soup",
    category: "Starter",
    image: "/FoodRecipe/itm/17.jpg",
    description: "Traditional Italian vegetable soup with pasta or rice.",
    ingredientsId: "I17",
    procedureId: "P17",
    videoUrl: "https://www.youtube.com/embed/_UMwoA1O-xI"
  },
  {
    id: "L18",
    name: "Blueberry Cheesecake",
    category: "Dessert",
    image: "/FoodRecipe/itm/18.jpg",
    description: "Creamy cheesecake layered with fresh blueberries and a buttery graham cracker crust.",
    ingredientsId: "I18",
    procedureId: "P18",
    videoUrl: "https://www.youtube.com/embed/beDAwNsKZUA"
  },
  {
    id: "L19",
    name: "Panna Cotta",
    category: "Dessert",
    image: "/FoodRecipe/itm/19.jpg",
    description: "Creamy Italian dessert made with sweetened cream and gelatin.",
    ingredientsId: "I19",
    procedureId: "P19",
    videoUrl: "https://www.youtube.com/embed/p5mSdmO6kEc"
  },
  {
    id: "L20",
    name: "Caprese Salad",
    category: "Starter",
    image: "/FoodRecipe/itm/20.jpg",
    description: "Fresh salad with mozzarella, tomatoes, basil, and olive oil.",
    ingredientsId: "I20",
    procedureId: "P20",
    videoUrl: "https://www.youtube.com/embed/gOcfUgd4ekA"
  },
  // Mexican Dishes
  {
    id: "L21",
    name: "Tacos",
    category: "Main Course",
    image: "/FoodRecipe/itm/21.jpg",
    description: "Corn tortillas filled with meat, veggies, and salsa.",
    ingredientsId: "I21",
    procedureId: "P21",
    videoUrl: "https://www.youtube.com/embed/pvSL_VsLb4w"
  },
  {
    id: "L22",
    name: "Chicken Drumstick",
    category: "Starter",
    image: "/FoodRecipe/itm/22.jpg",
    description: "Juicy chicken drumsticks marinated in spices and grilled to crispy perfection.",
    ingredientsId: "I22",
    procedureId: "P22",
    videoUrl: "https://www.youtube.com/embed/eIfkS5dDlo4"
  },
  {
    id: "L23",
    name: "Enchiladas",
    category: "Main Course",
    image: "/FoodRecipe/itm/23.jpg",
    description: "Rolled tortillas filled with meat and covered in sauce.",
    ingredientsId: "I23",
    procedureId: "P23",
    videoUrl: "https://www.youtube.com/embed/jRlTxTNRo1s"
  },
  {
    id: "L24",
    name: "Churros",
    category: "Dessert",
    image: "/FoodRecipe/itm/24.jpg",
    description: "Fried dough pastries coated in cinnamon sugar.",
    ingredientsId: "I24",
    procedureId: "P24",
    videoUrl: "https://www.youtube.com/embed/453mpKHVaBs"
  },
  {
    id: "L25",
    name: "Quesadilla",
    category: "Snacks",
    image: "/FoodRecipe/itm/25.jpg", 
    description: "Grilled tortilla filled with melted cheese and veggies.",
    ingredientsId: "I25",
    procedureId: "P25",
    videoUrl: "https://www.youtube.com/embed/AhoZ2TbLxzU"
  },
  // Mediterranean Dishes
  {
    id: "L26",
    name: "Hummus",
    category: "Snacks",
    image: "/FoodRecipe/itm/26.jpg",
    description: "Chickpea dip blended with tahini, lemon, and garlic.",
    ingredientsId: "I26",
    procedureId: "P26",
    videoUrl: "https://www.youtube.com/embed/BkdQOmqJuFc"
  },
  {
    id: "L27",
    name: "Greek Salad",
    category: "Starter",
    image: "/FoodRecipe/itm/27.jpg",
    description: "Salad with cucumbers, tomatoes, olives, and feta cheese.",
    ingredientsId: "I27",
    procedureId: "P27",
    videoUrl: "https://www.youtube.com/embed/kwq4vl610iY"
  },
  {
    id: "L28",
    name: "Falafel",
    category: "Snacks",
    image: "/FoodRecipe/itm/28.jpg",
    description: "Crispy chickpea fritters served with tahini sauce.",
    ingredientsId: "I28",
    procedureId: "P28",
    videoUrl: "https://www.youtube.com/embed/NZcWedPKysk"
  },
  {
    id: "L29",
    name: "Shawarma",
    category: "Main Course",
    image: "/FoodRecipe/itm/29.jpg",
    description: "Grilled marinated meat wrapped in pita bread.",
    ingredientsId: "I29",
    procedureId: "P29",
    videoUrl: "https://www.youtube.com/embed/lx-ZAmC3j4M"
  },
  {
    id: "L30",
    name: "Baklava",
    category: "Dessert",
    image: "/FoodRecipe/itm/30.jpg",
    description: "Layered pastry filled with nuts and sweet syrup.",
    ingredientsId: "I30",
    procedureId: "P30",
    videoUrl: "https://www.youtube.com/embed/EBHlZQn14C0"
  }
];

export default recipesData;