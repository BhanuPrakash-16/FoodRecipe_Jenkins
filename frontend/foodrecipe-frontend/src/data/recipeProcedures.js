const recipeProcedures = {
  "P1": `
Marinate chicken with curd, ginger-garlic paste, spices, and lemon juice for 30–60 minutes.  
Boil soaked basmati rice with bay leaf, cloves, cardamom, cinnamon, and salt until 70% cooked. Drain and set aside.  
Sauté sliced onions until golden, then add chopped tomatoes, chilies, and the marinated chicken. Cook until chicken is done.  
In a heavy-bottomed pot, layer the chicken mixture and rice alternately. Sprinkle mint, coriander, and saffron milk between layers.  
Cover tightly and cook on low heat (dum) for 15–20 minutes.  
Let it rest before mixing gently and serve hot with raita.
`,

  "P2": `
Heat butter and oil in a pan. Sauté chopped onions, tomatoes, and cashews until soft.  
Add ginger-garlic paste, red chili, turmeric, coriander, and garam masala. Cook until aromatic.  
Blend the mixture into a smooth paste and strain it back into the pan.  
Add cream, kasuri methi, sugar, and salt. Simmer gently.  
Add paneer cubes and cook for a few minutes.  
Garnish with coriander and serve with naan or roti.
`,

  "P3": `
Mix milk powder, maida, ghee, baking soda, and milk into a soft dough and rest it.  
Shape into smooth small balls without cracks.  
Deep fry on low heat until golden brown and drain.  
Boil sugar, water, cardamom, saffron to make syrup. Add rose water.  
Soak fried balls in warm syrup for 1–2 hours.  
Serve warm or chilled.
`,

  "P4": `
Heat oil and splutter mustard seeds, cumin, hing, curry leaves, and green chilies.  
Add mashed potatoes, turmeric, lemon juice, coriander, and salt. Mix and cool.  
Form small balls from the mixture.  
Dip in besan batter and deep fry until golden.  
Toast pav buns and spread green and tamarind chutneys.  
Place one vada in each pav and serve hot.
`,

  "P5": `
Marinate chicken with curd, spices, lemon juice, and salt. Let it rest.  
Cook chicken in a pan or grill until slightly charred.  
Sauté onions in butter, add tomato purée, and cook until thick.  
Add cumin, coriander powder, paprika, tomato paste and cook well.  
Add cream and the grilled chicken. Simmer until thick and creamy.  
Garnish and serve hot with naan or rice.
`,

  "P6": `
Mix besan, semolina, ginger-chili paste, lemon, sugar, salt, and water.  
Just before steaming, add Eno and mix gently.  
Pour into greased mold and steam for 15–20 minutes.  
Prepare tempering with mustard, sesame, chilies, curry leaves.  
Pour over steamed dhokla and garnish with coriander and coconut.
`,

  "P7": `
Soak rice and boil with milk on low flame, stirring continuously.  
Add sugar and cardamom once rice softens.  
Roast cashews, raisins, almonds in ghee and mix into kheer.  
Add saffron strands if using.  
Serve warm or chilled as dessert.
`,

  "P8": `
Soak and grind urad dal, rice, and optional dals. Ferment overnight.  
Boil and mash potatoes, sauté with onions, chilies, and spices.  
Spread dosa batter on hot pan, drizzle oil, and cook crisp.  
Add masala filling and fold.  
Serve with chutney and sambar.
`,

  "P9": `
Mix semolina, maida, soda, and knead to smooth dough. Rest and fry puris.  
Blend mint, coriander, chilies, and spices for pani.  
Mix boiled potatoes and chickpeas for stuffing.  
Crack puris, fill with stuffing and flavored water.  
Serve immediately for best crunch.
`,

  "P10": `
Soak rajma overnight and pressure cook till soft.  
Sauté onion, garlic, ginger, and chilies in oil.  
Add tomatoes and spices, cook until thick.  
Add boiled rajma and simmer 15–20 minutes.  
Serve hot with steamed rice and garnish with cilantro.
`,

  "P11": `
Make dough with flour, yeast, sugar, salt, oil, and water. Let rise.  
Roll dough, spread tomato sauce, add mozzarella and basil.  
Bake at high temperature till golden and bubbly.  
Drizzle with olive oil, season, and serve hot.
`,

  "P12": `
Boil pasta and reserve some water.  
Fry pancetta, optionally with garlic.  
Mix eggs with grated cheese and pepper.  
Toss pasta with pancetta off heat, add egg mixture.  
Use pasta water to make it creamy. Serve immediately.
`,

  "P13": `
Sauté onion and garlic in olive oil, add meat and cook till browned.  
Stir in tomatoes, paste, herbs, salt, and simmer into sauce.  
Mix ricotta with egg. Layer sauce, lasagna sheets, ricotta, and mozzarella.  
Repeat and top with cheese.  
Bake at 180°C for 30–40 mins. Garnish with parsley.
`,

  "P14": `
Whisk egg yolks and sugar till pale. Fold in mascarpone and whipped cream.  
Dip ladyfingers in coffee + liqueur.  
Layer cream and soaked biscuits alternately.  
Chill for 4+ hours. Dust with cocoa and top with chocolate before serving.
`,

  "P15": `
Heat olive oil or butter in a pan. Sauté the chopped onion or shallot until translucent.  
Add Arborio rice and toast for 1-2 minutes, stirring constantly.  
Pour in the white wine (if using) and stir until absorbed.  
Begin adding the warm broth one ladle at a time, stirring often. Let it absorb before adding more.  
Continue this process for about 18–20 minutes until rice is creamy and al dente.  
Stir in Parmesan cheese and finish with butter. Season with salt and pepper. Garnish with parsley and serve.
`,

  "P16": `
Toast bread slices in an oven or grill until lightly crisp and golden.  
While still warm, rub one side of each slice with a cut garlic clove.  
Mix diced tomatoes, chopped basil, olive oil, vinegar, salt, and pepper in a bowl.  
Spoon the tomato mixture generously onto each bread slice.  
Drizzle with more olive oil if desired. Serve immediately.
`,

  "P17": `
Heat olive oil in a large pot. Add onion and garlic, and cook until soft.  
Add carrots, celery, zucchini, green beans, and potato. Cook for 5–7 minutes.  
Stir in diced tomatoes and broth. Bring to a boil.  
Add beans, pasta or rice, and seasonings. Simmer for 10–15 minutes until pasta is cooked.  
Stir in spinach or kale if using and cook for another 2 minutes.  
Serve hot with parsley and Parmesan if desired.
`,

  "P18": `
Mix graham crumbs, sugar, and melted butter. Press into a pan. Chill for 10 mins.  
Beat cream cheese and sugar until smooth. Add vanilla and eggs one at a time.  
Add sour cream and optional flour. Pour over crust and bake at 160°C for 50–60 mins.  
Cool and refrigerate for 4+ hours.  
Cook blueberries with sugar, cornstarch, water, and lemon juice until thickened.  
Spread topping over cheesecake before serving.
`,

  "P19": `
Sprinkle gelatin over cold water and let it bloom for 5–10 mins.  
Heat cream, milk, and sugar in a saucepan. Do not boil. Stir in vanilla.  
Add bloomed gelatin and whisk until fully dissolved.  
Pour into molds or cups. Refrigerate for 4–6 hours until set.  
Serve with berries, coulis, and garnish as desired.
`,

  "P20": `
Slice tomatoes and mozzarella evenly.  
Arrange tomato and mozzarella slices alternately on a plate.  
Tuck fresh basil leaves between the slices.  
Drizzle with olive oil and balsamic glaze if using.  
Sprinkle with salt and black pepper. Serve chilled or at room temperature.
`,

  "P21": `
Heat oil in a skillet. Cook onion and garlic until soft.  
Add ground beef and cook until browned.  
Add spices, tomato paste, and water. Simmer for 5–7 mins.  
Warm tortillas and fill with meat mixture.  
Top with lettuce, tomatoes, cheese, sour cream, salsa, and lime. Serve warm.
`,

  "P22": `
Mix all spices and oil into a paste. Coat drumsticks thoroughly.  
Let marinate for 30 mins to 2 hours (optional).  
Preheat oven to 200°C. Arrange drumsticks on a baking sheet.  
Bake for 35–40 mins, flipping halfway through, until golden and cooked.  
Serve hot with lemon wedges or dip.
`,

  "P23": `
Preheat oven to 180°C. Cook ground beef with onion, garlic, and taco seasoning.  
Add half the enchilada sauce and green chiles. Mix well.  
Fill tortillas with the mixture and cheese. Roll and place seam-side down in baking dish.  
Top with remaining sauce and cheese.  
Bake for 25–30 mins until bubbly. Add toppings and serve.
`,

  "P24": `
Bring water, sugar, oil, and salt to a boil. Add flour and stir to form a dough.  
Let cool, then mix in eggs one at a time until smooth.  
Transfer to a piping bag. Heat oil and pipe dough into hot oil.  
Fry until golden. Drain and roll in cinnamon sugar.  
For sauce: heat cream, chocolate, and sugar until smooth. Serve warm with churros.
`,

  "P25": `
Heat butter/oil in a pan. Place a tortilla and sprinkle cheese on half.  
Add optional fillings like beans, meat, salsa, or veggies.  
Fold and cook until crispy and cheese is melted.  
Flip to brown both sides evenly.  
Slice and serve with dip or salsa.
`,

  "P26": `
If using dried chickpeas: soak overnight with baking soda and cook until soft.  
Blend chickpeas with tahini, lemon juice, garlic, salt, and ice water until smooth.  
Adjust consistency and seasoning.  
Drizzle with olive oil and garnish with toppings before serving.
`,

  "P27": `
Place tomatoes, cucumber, onion, and pepper in a bowl.  
Add olives and slabs of feta cheese on top.  
Drizzle with olive oil and vinegar.  
Sprinkle with oregano, salt, and pepper.  
Toss lightly before serving or serve layered.
`,

  "P28": `
Soak chickpeas overnight with baking soda. Drain and pat dry.  
Pulse all ingredients (except baking powder and oil) into a coarse mix.  
Stir in baking powder. Form small balls or patties.  
Deep fry in hot oil until golden and crisp.  
Serve with tahini sauce or in pita bread.
`,

  "P29": `
Combine marinade ingredients. Coat chicken and marinate for at least 1 hour.  
Grill or pan-cook the chicken until fully cooked and slightly charred.  
Slice and serve in pita with veggies, tahini sauce, and pickles.  
Optional: toast pita before filling.
`,

  "P30": `
Preheat oven to 175°C. Mix chopped nuts and cinnamon.  
Layer 8 filo sheets in a pan, brushing each with butter.  
Add a layer of nuts, then repeat layering filo and nuts, ending with filo.  
Cut into diamonds. Bake for 40–45 mins.  
Meanwhile, boil syrup ingredients for 10 mins. Let cool slightly.  
Pour syrup over hot baklava. Cool completely before serving.
`
};

export default recipeProcedures;
