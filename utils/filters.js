export const extractFilters = (recipes) => {
    const mealTypes = new Set();
    const cuisines = new Set();
    const dietaryPreferences = new Set();

    recipes.forEach((recipe) => {
        if (recipe.mealType) mealTypes.add(recipe.mealType);
        if (recipe.cuisine) cuisines.add(recipe.cuisine);
        if (recipe.dietaryPreferences) {
            recipe.dietaryPreferences.forEach((preference) => dietaryPreferences.add(preference));
        }
    });

    return {
        mealTypes: Array.from(mealTypes),
        cuisines: Array.from(cuisines),
        dietaryPreferences: Array.from(dietaryPreferences),
    };
};
