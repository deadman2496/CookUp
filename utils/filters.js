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

export const mealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Side Dish',
    'Snack',
];

export const cuisines = [
    'American',
    'Italian',
    'Mexican',
    'Indian',
    'Chinese',
    'Thai',
    'French',
    'Japanese',
    'Spanish',
    'Greek',
    'Middle Eastern',
    'South American',
];

export const dietaryPreferences = [
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Gluten Free',
    'Nut Free',
    'Lactose Intolerant',
    'Low Sodium',
    'Paleo',
    'Keto',
];
