import React, { createContext, useState, useContext, useEffect } from 'react';
// For local storage (if needed for local debugging)
import AsyncStorage from '@react-native-async-storage/async-storage';

// For backend calls
import { getUserFavoritesFromBackend, saveFavoriteToBackend, removeFavoriteFromBackend } from '../utils/RecipeCaller'; // hypothetical functions for backend
import { useRecipes } from './RecipeContext'; // Assuming this handles local recipes


export const FavoriteRecipesContext = createContext();

export const FavoriteRecipesProvider =({ children }) => {
    const { recipes: localRecipes } = useRecipes(); // Get local recipes if needed
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    // Load favorites from either local storage or backend
    useEffect(() => {
        const loadFavorites = async () => {
            if (DEBUG_MODE) {
                // Load favorites from local storage (for debugging)
                const storedFavorites = await AsyncStorage.getItem('favoriteRecipes');
                if (storedFavorites) {
                    setFavoriteRecipes(JSON.parse(storedFavorites));
                }
            } else {
                // Load favorites from backend
                try {
                    const backendFavorites = await getUserFavoritesFromBackend(); // Fetch user's favorites from backend
                    setFavoriteRecipes(backendFavorites);
                } catch (error) {
                    console.error('Error loading favorites from backend:', error);
                }
            }
        };
        loadFavorites();
    }, []);

    const addFavorite = async (recipe) => {
        const recipeId = recipe.id || recipe.$id; // Handle both local and backend recipes
        if (!isFavorite(recipeId)) {
            const updatedFavorites = [...favoriteRecipes, recipe];
            setFavoriteRecipes(updatedFavorites);

            if (DEBUG_MODE) {
                // Save favorites locally for debugging
                await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
            } else {
                // Save favorites to backend
                try {
                    await saveFavoriteToBackend(recipe); // Save favorite to backend
                } catch (error) {
                    console.error('Error saving favorite to backend:', error);
                }
            }
        }
    };

    // Remove a recipe from favorites (local or backend)
    const removeFavorite = async (recipeId) => {
        const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id === recipeId || recipe.$id === recipeId);
        setFavoriteRecipes(updatedFavorites);

        if (DEBUG_MODE) {
            // Update favorites locally for debugging
            await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
        } else {
            // Remove favorites from backend
            try {
                await removeFavoriteFromBackend(recipeId); // Remove favorite from backend
            } catch (error) {
                console.error('Error removing favorite from backend:', error);
            }
        }
    };

    // Check if a recipe is a favorite
    const isFavorite = (recipeId) => {
        return favoriteRecipes.some((recipe) => recipe.id === recipeId || recipe.$id === recipeId);
    };

    return (
        <FavoriteRecipesContext.Provider value={{ favoriteRecipes, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoriteRecipesContext.Provider>
     );
}

export const useFavorite = () => useContext(FavoriteRecipesContext);