//import { PoundCake, PastaCarbonara, poundCake, ChocoCake, CaesarSalad, CheesePizza, ChickenTeriyaki, SpanishFlan } from "./images";
import poundCake from "../assets/images/pc.png";
import ChocoCake from '../assets/images/Chocolate_cake.png';
import PastaCarbonara from '../assets/images/Pasta_Carbonara.png';
import CheesePizza from '../assets/images/Cheese_Pizza.png';
import CaesarSalad from '../assets/images/Caesar_Salad.png';
import PoundCake from '../assets/images/Traditional_Pound_Cake.png';
import SpanishFlan from '../assets/images/Spanish_Flan.png';
import ChickenTeriyaki from '../assets/images/Chicken_Teriyaki.png';

const recipes = [
    {   id: '1', 
        title:'Traditional Pound Cake', 
        description: 'tempting pound cake', 
        category: 'Dessert' , 
        image: PoundCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [ 
            '1 cup unsalted butter, at room temperature', 
            '1 1/3 cups granulated sugar', 
            '4 large Eggs at room temperature', 
            '2 teaspoons vanilla extract', 
            '1/4teaspoon almond extract', 
            '1/4 cup Sour Cream', 
            '1/4 cup Milk', 
            '2 cups All Purpose Flour', 
            '1/2 teaspoon Baking Powder', 
            '1/2 teaspoon Salt' 
        ], 
        instructions: [
            'Preheat the oven to 350°F and generously butter a standard size loaf pan on all sides.', 
            'In a stand mixer fit with the whisk attachment, combine the softened butter and granulated sugar. Beat on medium speed until light and fluffy, about 2 minutes.', 
            'Scrape down the sides of the bowl and add the eggs in one at a time, beating well between each addition. Add the vanilla and almond extract and mix well.', 
            'In a separate mixing bowl combine the flour, baking powder and salt and stir to combine.', 
            'Add about half of the flour mixture to the bowl of the mixer and mix until just combined. Add the sour cream and milk and mix until just combined. Add the remaining flour and mix until just combined and no streaks of flour remain. Do not over mix.', 
            'Transfer the batter into your prepared pan and use a silicone spatula to spread into an even layer.',
            'Bake for 45 minutes to 1 hour, or until a knife inserted into the middle comes back mostly clean and the loaf is golden brown.*' ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dessert' , cuisine: 'American', dietaryPreferences: ['Gluten Free'], averageCost:'$'}, creator: 'amarroquin' }, 
    {   id: '2', 
        title:'Spanish Flan', 
        description: 'Sweet Flan', 
        category: 'Dessert' , 
        image: SpanishFlan, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '1 cup white sugar',
            '3 large eggs',
            '1 (14 ounce) can sweetened condensed milk',
            '1 (12 fluid ounce) can evaporated milk',
            '1 tablespoon vanilla extract'
        ], 
        instructions: [
            'Preheat oven to 350 degrees F (175 degrees C).',
            'In a medium saucepan over medium-low heat, melt sugar until liquefied and golden in color. Carefully pour hot syrup into a 9 inch round glass baking dish',
            'Beat eggs in a large bowl. Add condensed milk, evaporated milk, and vanilla; beat until smooth. Pour egg mixture on top of caramel in the baking dish; place in a deep roasting pan. Carefully pour in enough hot water to come 1 inch up the sides of the dish',
            'Bake in the preheated oven until just set with a slight jiggle in the center, about 1 hour, checking after 55 minutes. Keep in mind the flan will continue to set as it cools. Remove from the oven and carefully transfer baking dish to a wire rack; cool to room temperature, then cover with plastic wrap to prevent a skin forming. Refrigerate for 3 hours or up to 3 days.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dessert' , cuisine: 'Spanish', dietaryPreferences: ['lactose intolerant'], averageCost:'$$'}, creator: 'Jane doe' },
    {   id: '3', 
        title:'Chicken Teriyaki', 
        description: 'Savory Teriyaki', 
        category: 'Dinner' , 
        image: ChickenTeriyaki, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '1 cup water',
            '1/8 cup cooking sherry',
            '3/4 tsp diced garlic',
            '1 1/4 tsp white pepper',
            '1/4 cup Kikkoman low sodium soy sauce',
            '1/4 cup olive oil',
            '2/4 cup 2 teaspoons Kikkoman Low Sodium Soy Sauce',
            '3/4 cup 2 teaspoons Kikkomann Teriyaki Sauce',
            '2 1/2 Cup Unsalted Chicken Stock',
            '1 clove garlic',
            '1 thin slice of ginger root',
            '3/4 cup 2 teaspoons Brown Sugar',
            'chicken thighs'
        ], 
        instructions: [
            'slice garlic clove into 3 or 4 slices and add to chicken stock with ginger root.',
            'Heat slowly stirring frequently on low to medium heat until warm.',
            'Promptly remove the garlic and ginger root. Leaving the ginger root in too long will make the sauce spicy.',
            'add teriyaki sauce, soy sauce, and brown sugar to the chicken stock. and slowly bring to a light boil while stirring constantly.',
            'in a separate bowl mix water, sherry, diced garlic, white pepper, soy sauce, and olive oil.',
            'place the chicken thighs in the marinade and massage the marinade into the chicken for 30 minutes.',
            'place the marinated chicken in a freezer bag and place the chicken in a fridge for at least 8 hours to 1 full day.',
            'place the sauce in a fridge to cool down until the chicken is ready to be cooked.',
            'place the chicken on a grill and cook until the internal temperature reaches 165 degrees.',
            'as the chicken is cooking, bring the sauce to a boil and then reduce to a simmer until the sauce thickens.',
            'once the chicken is done cooking, remove from the grill and let rest for 5 minutes.',
            'place the chicken on a plate and pour the sauce over the chicken.',
        ], 
        prepTime: '8 hours - 24 hours', 
        cookTime: '1 hour', 
        totalTime: '9 hours - 25 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dinner' , cuisine: 'Japanese', dietaryPreferences: ['nut free'], averageCost:'$$'}, creator: 'John doe' },
    {   id: '4', 
        title: 'Chocolate Cake', 
        description: 'Delicious dark cocolate cake', 
        category: 'Dessert' , 
        image: ChocoCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '1 and 3/4 cups (219g) all-purpose flour (spooned & leveled)',
            '3/4 cup (62g) unsweetened natural cocoa powder',
            '1 and 3/4 cups (350g) granulated sugar',
            '2 teaspoons baking soda',
            '1 teaspoon baking powder',
            '1 teaspoon salt',
            '2 teaspoons espresso powder (optional)',
            '1/2 cup (120ml) vegetable oil (or canola oil or melted coconut oil)',
            '2 large eggs, at room temperature',
            '2 teaspoons pure vanilla extract',
            '1 cup (240ml) buttermilk, at room temperature',
            '1 cup (240ml) freshly brewed strong hot coffee (regular or decaf)',
            '1 and 1/4 cups (282g) unsalted butter, softened to room temperature',
            '3 and 1/2 cups (420g) confectioners’ sugar',
            '3/4 cup (65g) unsweetened cocoa powder (natural or dutch process)',
            '3–5 Tablespoons (45-75ml) heavy cream (or half-and-half or milk), at room temperature',
            '1/4 teaspoon salt',
            '1 teaspoon pure vanilla extract',
            'optional for decoration: semi-sweet chocolate chips',
        ], 
        instructions: [
            'Preheat the oven to 350°F (177°C). Grease two 9-inch cake pans, line with parchment paper, then grease the parchment paper. Parchment paper helps the cakes seamlessly release from the pans.',
            'Make the cake: Whisk the flour, cocoa powder, sugar, baking soda, baking powder, salt, and espresso powder (if using) together in a large bowl. Set aside.',
            'Using a handheld or stand mixer fitted with a whisk attachment (or you can use a whisk) mix the oil, eggs, and vanilla together on medium-high speed until combined. Add the buttermilk and mix until combined. Pour the wet ingredients into the dry ingredients, add the hot water or coffee, and whisk or beat it all until the batter is completely combined.',
            'Divide batter evenly between 2 pans. Bake for 30-36 minutes. Baking times vary, so keep an eye on yours. The cakes are done when a toothpick inserted in the center comes out clean.',
            'Make the frosting: With a handheld or stand mixer fitted with a paddle or whisk attachment, beat the butter on medium speed until creamy – about 2 minutes. Add confectioners’ sugar, cocoa powder, heavy cream, salt, and vanilla extract. Beat on low speed for 30 seconds, then increase to high speed and beat for 1 full minute. Add 1/4 cup more confectioners’ sugar or cocoa powder if frosting is too thin or another Tablespoon of cream if frosting is too thick.',
            'Assemble and frost: First, using a large serrated knife, slice a thin layer off the tops of the cakes to create a flat surface. Discard (or crumble over ice cream!). Place 1 cake layer on your cake stand or serving plate. Evenly cover the top with frosting. Top with 2nd layer and spread remaining frosting all over the top and sides. Decorate with chocolate chips if desired.',
            'Slice and serve. Cover and store leftover cake at room temperature for 2-3 days or in the refrigerator for up to 5 days.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dessert' , cuisine: 'French', dietaryPreferences: ['Gluten Free'], averageCost:'$$$'}, creator: 'amarroquin' }, 
    {   id: '5', 
        title: 'Pasta Carbonara', 
        description: 'Creamy and comforting pasta dish', 
        category: 'Dinner' , 
        image: PastaCarbonara, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '10 slices bacon, cut into 1/2-inch pieces',
            '8 1/2 cups water, divided',
            '4 cloves garlic, minced',
            '1 pound spaghetti or linguine',
            '1 1/4 cups finely grated parmesan cheese',
            '3 large eggs',
            '1 large egg yolk',
            '1 tsp each salt and pepper',
            'chopped fresh parsley, for garnish',
        ], 
        instructions: [
            'Add bacon and 1/2 cup of the water to a large non-stick skillet and bring to a simmer over medium-high heat.',
            'Allow to simmer until water evaporates about 6 - 7 minutes, then reduce heat to medium-low and continue to cook until bacon is brown and crisp, about 6 - 8 minutes longer.',
            'Place a fine mesh strainer over a bowl then pour bacon into strainer while reserving about 1 tsp of the rendered fat in pan. Return pan to heat and saute garlic about 30 seconds, until fragrant and lightly golden.',
            'Pour into a medium mixing bowl then add 1 Tbsp rendered bacon fat (drippings in bowl set under strainer) to mixing bowl with garlic. Add eggs, egg yolk, parmesan and pepper to garlic mixture and whisk until well combined.',
            'Meanwhile, bring 8 cups of water to a boil in a large dutch oven (no more than 8 cups because you want a very starchy water for the sauce). Add spaghetti and salt to boiling water and cook until al dente. While pasta is boiling, set a colander in a large bowl.',
            'Carefully drain al dente pasta into colander in bowl, while reserving pasta water in bowl. Measure out 1 cup hot pasta water and discard remaining water. Immediately place pasta in now empty large bowl.',
            'Slowly pour and whisk 1/2 cup pasta water into egg mixture, then slowly pour mixture over pasta while tossing to coat. Add bacon and toss to combine. Season with salt if desired.',
            'Let pasta rest, tossing frequently, 2 - 4 minutes until sauce has thickened slightly and coats pasta. Thin with remaining 1/2 cup hot pasta water as needed. Serve immediately topped with additional parmesan and parsley.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dinner' , cuisine: 'Italian', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'Jane doe' },
    {   id: '6', 
        title: 'Cheese Pizza', 
        description: 'Classic cheese and tomato pizza.', 
        category: 'Lunch' , 
        image: CheesePizza, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '1 ball of pizza dough',
            'all-purpose flour, for dusting',
            'semolina flour, for dusting',
            '1/4 cup Basic Pizza Sauce',
            '3 ounces shredded low-moisture mozzarella cheese',
            'fresh basil leaves, for garnish',
        ], 
        instructions: [
            'Let chilled covered dough stand at room temperature until dough is cool (not cold) and a fingerprint remains when dough is pressed, 1 to 2 hours. Transfer 1 dough ball to a heavily floured surface. Using floured fingertips, firmly press all over dough, leaving a 1/2-inc',
            "If cooking in your home oven, preheat to 500°F with a baking steel or large round cast-iron pizza pan (such as Lodge 15-inch) on middle rack. Let pan preheat in oven for about 30 minutes. If using an outdoor pizza oven, preheat pizza oven and pizza stone according to manufacturer's instructions on high 20 minutes. (Note: Cooking with wood takes more experience to control the heat, so we've only included instructions for gas oven cooking here.)",
            'Form a C-shape with the outer edge of your hand, and press firmly inside dough border to define a 1/2-inch wide ring around edge of dough. Lift dough onto the knuckles of both hands, and gently stretch, rotating dough after each stretch to maintain its round shape. Continue gently stretching dough, allowing gravity to help it expand, until a 10-inch circle of even thickness forms, with a slightly thicker outer ring. Lay dough round on a semolina-dusted pizza peel, reshaping as needed to form a circle. Spread dough round with Basic Pizza Sauce. Top with shredded mozzarella.',
            'Gently shake pizza peel with prepared pie to loosen. If pizza feels stuck in any areas, carefully lift pizza edge with a bench scraper, and dust peel with a 1:1 mixture of semolina and bread flour. Unload pizza onto preheated pan in home oven, or onto stone in outdoor pizza oven using quick, decisive movements: Set the peel edge on the pan at about a 20-degree angle, and quickly pull back peel to slide half of the pizza onto the pan. Gently shake the peel side to side while pulling it back to slide the rest of the pizza onto the pan, allowing it to stretch slightly.',
            'If baking in a home oven, bake at 500°F until edges of crust have puffed slightly, about 3 minutes. Rotate pan 90 degrees, and increase oven temperature to broil. Broil until pizza is cooked through and crust is browned, 3 to 6 minutes. If baking in an outdoor pizza oven, cook pizza, using peel to rotate pizza 90 degrees every 20 to 30 seconds, until cooked through and crust is risen and charred in spots, 2 to 4 minutes.',
            'Using peel, transfer pizza to a cutting board. Garnish with fresh basil or oregano, if desired, and cut into wedges.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Lunch' , cuisine: 'Italian', dietaryPreferences: ['lactose inolerant'], averageCost:'$$$'}, creator: 'John doe' },
    {   id: '7', 
        title: 'Caesar Salad', 
        description: 'Fresh romaine lettuce with Caesar dressing.', 
        category: 'Brunch' , 
        image: CaesarSalad, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '2 small garlic cloves, minced (1 tsp)',
            '2 tsp dijon mustard',
            '1 tsp Worcestershire sauce',
            '2 tsp fresh lemon juice',
            '1 1/2 tsp red wine vinegar',
            '1/3 cup extra virgin olive oil',
            '1/2 tsp sea salt, or to taste',
            '1/8 tsp black pepper, plus more to serve',
            '1 large romaine lettuce, (or 2 small heads romaine)',
            '1/3 cup parmesan cheese, shredded or shaved',
        ], 
        instructions: [
            'In a small bowl, whisk together garlic, dijon, Worcestershire, lemon juice and red wine vinegar.',
            'Slowly drizzle in extra virgin olive oil while whisking constantly.',
            'Whisk in 1/2 tsp salt and 1/8 tsp black pepper, or season to taste.',
            'Rinse, dry and chop or tear the romaine into bite-sized pieces. ',
            'Place in a large serving bowl and sprinkle generously with shredded parmesan cheese and cooled croutons.', 
            'Drizzle with caesar dressing and toss gently until lettuce is evenly coated.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'side dish' , cuisine: 'greek', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'amarroquin' },
    {   id: '8', 
        title: 'Pound Cake', 
        description: 'feels like the name', 
        category: 'Dessert' , 
        image: poundCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
        ], 
        instructions: [
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dessert' , cuisine: 'South American', dietaryPreferences: ['nut free'], averageCost:'$$$'}, creator: 'Jane doe' },
];

const featuredRecipes = [
    {   id: '9', 
        title: 'Chocolate Cake', 
        description: 'Delicious dark cocolate cake', 
        category: 'Dessert' , 
        image: ChocoCake, 
        summary: 'This is a summary of the recipe.', 
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        ingredients: [
            '1 and 3/4 cups (219g) all-purpose flour (spooned & leveled)',
            '3/4 cup (62g) unsweetened natural cocoa powder',
            '1 and 3/4 cups (350g) granulated sugar',
            '2 teaspoons baking soda',
            '1 teaspoon baking powder',
            '1 teaspoon salt',
            '2 teaspoons espresso powder (optional)',
            '1/2 cup (120ml) vegetable oil (or canola oil or melted coconut oil)',
            '2 large eggs, at room temperature',
            '2 teaspoons pure vanilla extract',
            '1 cup (240ml) buttermilk, at room temperature',
            '1 cup (240ml) freshly brewed strong hot coffee (regular or decaf)',
            '1 and 1/4 cups (282g) unsalted butter, softened to room temperature',
            '3 and 1/2 cups (420g) confectioners’ sugar',
            '3/4 cup (65g) unsweetened cocoa powder (natural or dutch process)',
            '3–5 Tablespoons (45-75ml) heavy cream (or half-and-half or milk), at room temperature',
            '1/4 teaspoon salt',
            '1 teaspoon pure vanilla extract',
            'optional for decoration: semi-sweet chocolate chips',
        ], 
        instructions: [
            'Preheat the oven to 350°F (177°C). Grease two 9-inch cake pans, line with parchment paper, then grease the parchment paper. Parchment paper helps the cakes seamlessly release from the pans.',
            'Make the cake: Whisk the flour, cocoa powder, sugar, baking soda, baking powder, salt, and espresso powder (if using) together in a large bowl. Set aside.',
            'Using a handheld or stand mixer fitted with a whisk attachment (or you can use a whisk) mix the oil, eggs, and vanilla together on medium-high speed until combined. Add the buttermilk and mix until combined. Pour the wet ingredients into the dry ingredients, add the hot water or coffee, and whisk or beat it all until the batter is completely combined.',
            'Divide batter evenly between 2 pans. Bake for 30-36 minutes. Baking times vary, so keep an eye on yours. The cakes are done when a toothpick inserted in the center comes out clean.',
            'Make the frosting: With a handheld or stand mixer fitted with a paddle or whisk attachment, beat the butter on medium speed until creamy – about 2 minutes. Add confectioners’ sugar, cocoa powder, heavy cream, salt, and vanilla extract. Beat on low speed for 30 seconds, then increase to high speed and beat for 1 full minute. Add 1/4 cup more confectioners’ sugar or cocoa powder if frosting is too thin or another Tablespoon of cream if frosting is too thick.',
            'Assemble and frost: First, using a large serrated knife, slice a thin layer off the tops of the cakes to create a flat surface. Discard (or crumble over ice cream!). Place 1 cake layer on your cake stand or serving plate. Evenly cover the top with frosting. Top with 2nd layer and spread remaining frosting all over the top and sides. Decorate with chocolate chips if desired.',
            'Slice and serve. Cover and store leftover cake at room temperature for 2-3 days or in the refrigerator for up to 5 days.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8', 
        filters: {mealType: 'Dessert' , cuisine: 'French', dietaryPreferences: ['Gluten Free'], averageCost:'$$$'}, creator: 'amarroquin' }, 
    {   id: '10', 
        title: 'Pasta Carbonara', 
        description: 'Creamy and comforting pasta dish', 
        category: 'Dinner' , 
        image: PastaCarbonara,
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ], 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '10 slices bacon, cut into 1/2-inch pieces',
            '8 1/2 cups water, divided',
            '4 cloves garlic, minced',
            '1 pound spaghetti or linguine',
            '1 1/4 cups finely grated parmesan cheese',
            '3 large eggs',
            '1 large egg yolk',
            '1 tsp each salt and pepper',
            'chopped fresh parsley, for garnish',
        ], 
        instructions: [
            'Add bacon and 1/2 cup of the water to a large non-stick skillet and bring to a simmer over medium-high heat.',
            'Allow to simmer until water evaporates about 6 - 7 minutes, then reduce heat to medium-low and continue to cook until bacon is brown and crisp, about 6 - 8 minutes longer.',
            'Place a fine mesh strainer over a bowl then pour bacon into strainer while reserving about 1 tsp of the rendered fat in pan. Return pan to heat and saute garlic about 30 seconds, until fragrant and lightly golden.',
            'Pour into a medium mixing bowl then add 1 Tbsp rendered bacon fat (drippings in bowl set under strainer) to mixing bowl with garlic. Add eggs, egg yolk, parmesan and pepper to garlic mixture and whisk until well combined.',
            'Meanwhile, bring 8 cups of water to a boil in a large dutch oven (no more than 8 cups because you want a very starchy water for the sauce). Add spaghetti and salt to boiling water and cook until al dente. While pasta is boiling, set a colander in a large bowl.',
            'Carefully drain al dente pasta into colander in bowl, while reserving pasta water in bowl. Measure out 1 cup hot pasta water and discard remaining water. Immediately place pasta in now empty large bowl.',
            'Slowly pour and whisk 1/2 cup pasta water into egg mixture, then slowly pour mixture over pasta while tossing to coat. Add bacon and toss to combine. Season with salt if desired.',
            'Let pasta rest, tossing frequently, 2 - 4 minutes until sauce has thickened slightly and coats pasta. Thin with remaining 1/2 cup hot pasta water as needed. Serve immediately topped with additional parmesan and parsley.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8', 
        filters: {mealType: 'Dinner' , cuisine: 'Italian', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'Jane doe' },
    {   id: '11', 
        title: 'Cheese Pizza', 
        description: 'Classic cheese and tomato pizza.', 
        category: 'Lunch' , 
        image: CheesePizza, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '1 ball of pizza dough',
            'all-purpose flour, for dusting',
            'semolina flour, for dusting',
            '1/4 cup Basic Pizza Sauce',
            '3 ounces shredded low-moisture mozzarella cheese',
            'fresh basil leaves, for garnish',
        ], 
        instructions: [
            'Let chilled covered dough stand at room temperature until dough is cool (not cold) and a fingerprint remains when dough is pressed, 1 to 2 hours. Transfer 1 dough ball to a heavily floured surface. Using floured fingertips, firmly press all over dough, leaving a 1/2-inc',
            "If cooking in your home oven, preheat to 500°F with a baking steel or large round cast-iron pizza pan (such as Lodge 15-inch) on middle rack. Let pan preheat in oven for about 30 minutes. If using an outdoor pizza oven, preheat pizza oven and pizza stone according to manufacturer's instructions on high 20 minutes. (Note: Cooking with wood takes more experience to control the heat, so we've only included instructions for gas oven cooking here.)",
            'Form a C-shape with the outer edge of your hand, and press firmly inside dough border to define a 1/2-inch wide ring around edge of dough. Lift dough onto the knuckles of both hands, and gently stretch, rotating dough after each stretch to maintain its round shape. Continue gently stretching dough, allowing gravity to help it expand, until a 10-inch circle of even thickness forms, with a slightly thicker outer ring. Lay dough round on a semolina-dusted pizza peel, reshaping as needed to form a circle. Spread dough round with Basic Pizza Sauce. Top with shredded mozzarella.',
            'Gently shake pizza peel with prepared pie to loosen. If pizza feels stuck in any areas, carefully lift pizza edge with a bench scraper, and dust peel with a 1:1 mixture of semolina and bread flour. Unload pizza onto preheated pan in home oven, or onto stone in outdoor pizza oven using quick, decisive movements: Set the peel edge on the pan at about a 20-degree angle, and quickly pull back peel to slide half of the pizza onto the pan. Gently shake the peel side to side while pulling it back to slide the rest of the pizza onto the pan, allowing it to stretch slightly.',
            'If baking in a home oven, bake at 500°F until edges of crust have puffed slightly, about 3 minutes. Rotate pan 90 degrees, and increase oven temperature to broil. Broil until pizza is cooked through and crust is browned, 3 to 6 minutes. If baking in an outdoor pizza oven, cook pizza, using peel to rotate pizza 90 degrees every 20 to 30 seconds, until cooked through and crust is risen and charred in spots, 2 to 4 minutes.',
            'Using peel, transfer pizza to a cutting board. Garnish with fresh basil or oregano, if desired, and cut into wedges.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Lunch' , cuisine: 'Italian', dietaryPreferences: ['lactose inolerant'], averageCost:'$$$'}, creator: 'John doe' },
    {   id: '12', 
        title: 'Caesar Salad', 
        description: 'Fresh romaine lettuce with Caesar dressing.', 
        category: 'Brunch' , 
        image: CaesarSalad, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            '2 small garlic cloves, minced (1 tsp)',
            '2 tsp dijon mustard',
            '1 tsp Worcestershire sauce',
            '2 tsp fresh lemon juice',
            '1 1/2 tsp red wine vinegar',
            '1/3 cup extra virgin olive oil',
            '1/2 tsp sea salt, or to taste',
            '1/8 tsp black pepper, plus more to serve',
            '1 large romaine lettuce, (or 2 small heads romaine)',
            '1/3 cup parmesan cheese, shredded or shaved',
        ], 
        instructions: [
            'In a small bowl, whisk together garlic, dijon, Worcestershire, lemon juice and red wine vinegar.',
            'Slowly drizzle in extra virgin olive oil while whisking constantly.',
            'Whisk in 1/2 tsp salt and 1/8 tsp black pepper, or season to taste.',
            'Rinse, dry and chop or tear the romaine into bite-sized pieces. ',
            'Place in a large serving bowl and sprinkle generously with shredded parmesan cheese and cooled croutons.', 
            'Drizzle with caesar dressing and toss gently until lettuce is evenly coated.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'side dish' , cuisine: 'greek', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'amarroquin' },
    {   id: '13', 
        title: 'Pound Cake', 
        description: 'feels like the name', 
        category: 'Dessert' , 
        image: poundCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
            'These are the ingredients.',
        ], 
        instructions: [
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
            'These are the instructions.',
        ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        filters: {mealType: 'Dessert' , cuisine: 'South American', dietaryPreferences: ['nut free'], averageCost:'$$$'}, creator: 'Jane doe' },
];

export { recipes, featuredRecipes };