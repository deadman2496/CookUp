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
    { id: '1', title:'Traditional Pound Cake', 
        description: 'tempting pound cake', 
        category: 'Dessert' , 
        image: PoundCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [ '1 cup unsalted butter, at room temperature', '1 1/3 cups granulated sugar', '4 large Eggs at room temperature', '2 teaspoons vanilla extract', '1/4teaspoon almond extract', '1/4 cup Sour Cream', '1/4 cup Milk', '2 cups All Purpose Flour', '1/2 teaspoon Baking Powder', '1/2 teaspoon Salt' ], 
        instructions: ['Preheat the oven to 350°F and generously butter a standard size loaf pan on all sides.', 'In a stand mixer fit with the whisk attachment, combine the softened butter and granulated sugar. Beat on medium speed until light and fluffy, about 2 minutes.', 'Scrape down the sides of the bowl and add the eggs in one at a time, beating well between each addition. Add the vanilla and almond extract and mix well.', 'In a separate mixing bowl combine the flour, baking powder and salt and stir to combine.', 'Add about half of the flour mixture to the bowl of the mixer and mix until just combined. Add the sour cream and milk and mix until just combined. Add the remaining flour and mix until just combined and no streaks of flour remain. Do not over mix.', 'Transfer the batter into your prepared pan and use a silicone spatula to spread into an even layer.','Bake for 45 minutes to 1 hour, or until a knife inserted into the middle comes back mostly clean and the loaf is golden brown.*' ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8', 
        filters: {mealType: 'Dessert' , cuisine: 'American', dietaryPreferences: ['Gluten Free'], averageCost:'$'}, creator: 'amarroquin' }, 
    { id: '2', title:'Spanish Flan', description: 'Sweet Flan', category: 'Dessert' , image: SpanishFlan, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dessert' , cuisine: 'Spanish', dietaryPreferences: ['lactose intolerant'], averageCost:'$$'}, creator: 'Jane doe' },
    { id: '3', title:'Chicken Teriyaki', description: 'Savory Teriyaki', category: 'Dinner' , image: ChickenTeriyaki, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dinner' , cuisine: 'Japanese', dietaryPreferences: ['nut free'], averageCost:'$$'}, creator: 'John doe' },
    { id: '4', title: 'Chocolate Cake', description: 'Delicious dark cocolate cake', category: 'Dessert' , image: ChocoCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dessert' , cuisine: 'French', dietaryPreferences: ['Gluten Free'], averageCost:'$$$'}, creator: 'amarroquin' }, 
    { id: '5', title: 'Pasta Carbonara', description: 'Creamy and comforting pasta dish', category: 'Dinner' , image: PastaCarbonara, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dinner' , cuisine: 'Italian', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'Jane doe' },
    { id: '6', title: 'Cheese Pizza', description: 'Classic cheese and tomato pizza.', category: 'Lunch' , image: CheesePizza, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Lunch' , cuisine: 'Italian', dietaryPreferences: ['lactose inolerant'], averageCost:'$$$'}, creator: 'John doe' },
    {   id: '7', title: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', category: 'Brunch' , image: CaesarSalad, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'side dish' , cuisine: 'greek', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'amarroquin' },
    {   id: '8', title: 'Pound Cake', description: 'feels like the name', category: 'Dessert' , image: poundCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dessert' , cuisine: 'South American', dietaryPreferences: ['nut free'], averageCost:'$$$'}, creator: 'Jane doe' },
];

const featuredRecipes = [
    { id: '3', title: 'Pasta Carbonara', description: 'Creamy and comforting pasta dish', category: 'Dinner' , image: PastaCarbonara, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dinner' , cuisine: 'Italian', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'John' },
    { id: '4', title: 'Pound Cake', description: 'feels like the name', category: 'Dessert' , image: poundCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Lunch' , cuisine: 'Italian', dietaryPreferences: ['lactose inolerant'], averageCost:'$$$'}, creator: 'Theola' },    
    { id: '2', title: 'Cheese Pizza', description: 'Classic cheese and tomato pizza.', category: 'Lunch' , image: CheesePizza, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'side dish' , cuisine: 'greek', dietaryPreferences: ['Vegan'], averageCost:'$'}, creator: 'Jimmy' }, 
    { id: '1', title: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', category: 'Brunch' , image: CaesarSalad, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: {mealType: 'Dessert' , cuisine: 'South American', dietaryPreferences: ['nut free'], averageCost:'$$$'}, creator: 'Jane' },
];

export { recipes, featuredRecipes };