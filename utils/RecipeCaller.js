import { database, appwriteConfig } from "../lib/appwrite";
import { ID } from 'appwrite';

const recipeStorage = appwriteConfig.recipeCollectionId;

export const getAllRecipes = async () => {
    try{
        const response = await database.listDocuments( appwriteConfig.databaseId, recipeStorage);
        return response.documents;
    } catch (error){
        console.error("Recipes failed to load. here's why :", error);
        return [];
    }
};

export const getRecipeById = async (recipeId) => {
    try {
        const response = await database.getDocument(appwriteConfig.databaseId, recipeStorage, recipeId);
        return response;
    } catch (error) {
        console.error('Error fetching recipe by ID', error);
        return null;
    }
};

export const addNewRecipe = async (recipeData) => {
    try {
        const response = await database.createDocument(appwriteConfig.databaseId, recipeStorage, ID.unique(), recipeData);
        return response;
    } catch (error) {
        console.error('Error adding new recipe:', error);
        return null;
    }
};

export const updateRecipe = async (recipeId, recipeData) => {
    try {
        const response = await database.updateDocument(appwriteConfig.databaseId, recipeStorage, recipeId, recipeData )
        return response;
    } catch (error) {
        console.error('Error updating recipe:', error);
        return null;
    }
};

export const deleteRecipe = async (recipeId) => {
    try {
        await database.deleteDocument(appwriteConfig.databaseId, recipeStorage, recipeId);
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};