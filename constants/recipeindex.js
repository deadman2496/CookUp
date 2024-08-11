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
    { id: '1', title:'Traditional Pound Cake', description: 'tempting pound cake', category: 'Dessert' , image: PoundCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: [{key: 'sweets', label:'after dinner fix', options: ['Gluten-free', 'Pastry']}, {key: 'difficulty', label: 'Difficulty Level', options: ['Easy', 'Medium', 'Hard']}] }, 
    { id: '2', title:'Spanish Flan', description: 'Sweet Flan', category: 'Dessert' , image: SpanishFlan, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: [{key: 'sweets', label:'after dinner fix', options: ['Gluten-free', 'Pastry']}] },
    { id: '3', title:'Chicken Teriyaki', description: 'Savory Teriyaki', category: 'Dinner' , image: ChickenTeriyaki, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: [{key: 'diet', label:'Sakura Japan style but healthy', options: ['Chicken', 'high Protein',]}] },
    { id: '4', title: 'Chocolate Cake', description: 'Delicious dark cocolate cake', category: 'Dessert' , image: ChocoCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Dessert', 'Brunch'] }, 
    { id: '5', title: 'Pasta Carbonara', description: 'Creamy and comforting pasta dish', category: 'Dinner' , image: PastaCarbonara, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Dinner', 'Lunch'] },
    { id: '6', title: 'Cheese Pizza', description: 'Classic cheese and tomato pizza.', category: 'Lunch' , image: CheesePizza, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Lunch', 'Dinner'] },
    {   id: '7', title: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', category: 'Brunch' , image: CaesarSalad, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Brunch', 'Lunch'] },
    {   id: '8', title: 'Pound Cake', description: 'feels like the name', category: 'Dessert' , image: poundCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Dessert', 'Brunch'] },
];

const featuredRecipes = [
    { id: '3', title: 'Pasta Carbonara', description: 'Creamy and comforting pasta dish', category: 'Dinner' , image: PastaCarbonara, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Dinner', 'Lunch'] },
    { id: '4', title: 'Pound Cake', description: 'feels like the name', category: 'Dessert' , image: poundCake, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Dessert', 'Brunch'] },    
    { id: '2', title: 'Cheese Pizza', description: 'Classic cheese and tomato pizza.', category: 'Lunch' , image: CheesePizza, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Lunch', 'Dinner'] }, 
    { id: '1', title: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', category: 'Brunch' , image: CaesarSalad, summary: 'This is a summary of the recipe.', ingredients: 'These are the ingredients.', instructions: 'These are the instructions.', prepTime: '1 hour', cookTime: '1 hour', totalTime: '2 hours', servings: '8', filters: ['Brunch', 'Lunch'] },
];

export { recipes, featuredRecipes };