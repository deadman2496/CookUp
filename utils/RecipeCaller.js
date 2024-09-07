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

    createRecipe({
        title:'Traditional Pound Cake', 
        description: 'tempting pound cake', 
        category: 'Dessert' , 
        image: PoundCake, 
        summary: 'This is a summary of the recipe.', 
        ingredients: [ 
            '1 cup unsalted butter, at room temperature', 
            '1 1/3 cups granulated sugar', 
            '4 large Eggs at room temperature', 
            '2 teaspoons vanilla extract', 
            '1/4teaspoon almond extract', 
            '1/4 cup Sour Cream', 
            '1/4 cup Milk', 
            '2 cups All Purpose Flour', 
            '1/2 teaspoon Baking Powder', 
            '1/2 teaspoon Salt' 
        ], 
        instructions: [
            'Preheat the oven to 350°F and generously butter a standard size loaf pan on all sides.', 
            'In a stand mixer fit with the whisk attachment, combine the softened butter and granulated sugar. Beat on medium speed until light and fluffy, about 2 minutes.', 
            'Scrape down the sides of the bowl and add the eggs in one at a time, beating well between each addition. Add the vanilla and almond extract and mix well.', 
            'In a separate mixing bowl combine the flour, baking powder and salt and stir to combine.', 
            'Add about half of the flour mixture to the bowl of the mixer and mix until just combined. Add the sour cream and milk and mix until just combined. Add the remaining flour and mix until just combined and no streaks of flour remain. Do not over mix.', 
            'Transfer the batter into your prepared pan and use a silicone spatula to spread into an even layer.',
            'Bake for 45 minutes to 1 hour, or until a knife inserted into the middle comes back mostly clean and the loaf is golden brown.*' ], 
        prepTime: '1 hour', 
        cookTime: '1 hour', 
        totalTime: '2 hours', 
        servings: '8',  
        rating: 4,
        reviewCount: 150,
        reviews: [
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
            {userName: 'Jane Doe', text: 'This is a review of the recipe.', rating: 4,},
        ],
        mealType: 'Dessert' , 
        cuisine: 'American', 
        dietaryPreferences: ['Gluten Free'], 
        averageCost:'$', 
        creator: {username}
    });
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

export const  getRecipesByTag = async (selectedTags) => {
    try {
        const response = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.recipeCollectionId, [
            // Filters recipes by with one or more tags
            Appwrite.Query.equal('tags', selectedTags)
        ]);
        return response.documents;
    } catch (error){
        console.error('Error fetching recipes by tag:', error);
    }
};