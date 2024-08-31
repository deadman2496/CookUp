import React, { createContext, useState, useContext } from 'react';
import { getRecipes, addRecipe} from '../constants/recipeindex';

export const RecipeContext = createContext();


export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState(getRecipes());

    const addNewRecipe = (newRecipe) => {
        addRecipe(newRecipe); // Updates Recipe Index
        setRecipes([...recipes, newRecipe]); // Updates State
    };

    return ( 
        <RecipeContext.Provider value={{ recipes, addNewRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};