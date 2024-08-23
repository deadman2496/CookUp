import React, { createContext, useState, useContext} from 'react';

export const FavoriteRecipesContext = createContext();

export const FavoriteRecipesProvider =({ children }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const addFavorite = (recipe) => {
        setFavoriteRecipes((prevFavorites) => [...prevFavorites, recipe]);
    };

    const removeFavorite = (recipeId) => {
        setFavoriteRecipes((prevFavorites) => prevFavorites.filter((recipe) => recipe.id !== recipeId));
    };

    const isFavorite = (recipeId) => {
        return favoriteRecipes.some((recipe) => recipe.id === recipeId);
     };

    return (
        <FavoriteRecipesContext.Provider value={{ favoriteRecipes, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoriteRecipesContext.Provider>
     );
}

export const useFavorite = () => useContext(FavoriteRecipesContext);