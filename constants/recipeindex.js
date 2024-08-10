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
    { id: '1', title:'Traditional Pound Cake', description: 'tempting pound cake', category: 'Dessert' , image: PoundCake},
    { id: '2', title:'Spanish Flan', description: 'Sweet Flan', category: 'Dessert' , image: SpanishFlan},
    { id: '3', title:'Chicken Teriyaki', description: 'Savory Teriyaki', category: 'Dinner' , image: ChickenTeriyaki},
    { id: '4', title: 'Chocolate Cake', description: 'Delicious dark cocolate cake', category: 'Dessert' , image: ChocoCake }, 
];

const featuredRecipes = [
    { id: '3', title: 'Pasta Carbonara', description: 'Creamy and comforting pasta dish', category: 'Dinner' , image: PastaCarbonara },
    { id: '4', title: 'Pound Cake', description: 'feels like the name', category: 'Dessert' , image: poundCake },    
    { id: '2', title: 'Cheese Pizza', description: 'Classic cheese and tomato pizza.', category: 'Lunch' , image: CheesePizza },
    { id: '1', title: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', category: 'Brunch' , image: CaesarSalad },
];

export { recipes, featuredRecipes };