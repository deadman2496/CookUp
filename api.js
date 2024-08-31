import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes', error);
        throw error;
    }
};

export const createRecipe = async (recipe) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/recipes`, recipe);
        return response.data;
    } catch (error) {
        console.error('Error creating recipe', error);
        throw error;
    }
};