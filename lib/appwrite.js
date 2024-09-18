import {Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.kba.cookup",
    projectId: '66d24cca00125c0a380f',
    databaseId:'66d28bbd001c29c837d1',
    userCollectionId: '66d28be5002aa8777891',
    videoCollectionId: '66d28c2500090390dc32',
    imageCollectionId: '66d28c1b002b0cdcb720',
    recipeCollectionId: '66d28c2e0019081a8661',
    storageId:'66d2901c0015774cbebd',
    filtersId: '66e55a870018189e8501',
    allergyId: '66e55d87002ff44dfe6a',
    costId: '66e55c6c0019e820e740',
    dietId: '66e55c5800147b2a19e9',
    cuisineId: '66e55c1a000f02ea8b53',
    mealId: '66e55bca000d1cfa95c6',

};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  imageCollectionId,
  recipeCollectionId,
  storageId,
  filtersId,
  allergyId,
  costId,
  dietId,
  cuisineId,
  mealId,
} = appwriteConfig;

//Init your React Native SDK

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

export const account = new Account(client);
export const avatars = new Avatars(client);
export const database = new Databases(client);

export const createUser = async (email, password, username, firstName, lastName, phoneNumber) => {
    try {
        const newAccount = await account.create (
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);


        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                userId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
                phoneNumber,
                firstName,
                lastName,
            },
        )

        return newUser;
    } catch (error){
        console.error("Error with document:",error.response);
        console.error("Error with document:",error.response);
        throw new Error(error);
        console.log(newUser);
    };
};

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    };
};

export const sendVerificationEmail = async (redirectURL) => {
    try {
        await account.createVerification(redirectURL);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllRecipes = async () => {
  try {
      const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.recipeCollectionId
      );
      return response.documents; // Return the list of recipes
  } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error(error.message);
  }
};

// Example of how to fetch recipes based on tags
export const getRecipesByTag = async (selectedTags) => {
  try {
      const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.recipeCollectionId,
          [
              // Assuming Appwrite's Query API is being used to filter by tags
              Appwrite.Query.equal('tags', selectedTags),
          ]
      );
      return response.documents;
  } catch (error) {
      console.error('Error fetching recipes by tag:', error);
      throw new Error(error.message);
  }
};

export const getRecipeById = async (recipeId, documentId) => {
  try {
      const response = await database.getDocument(appwriteConfig.databaseId, appwriteConfig.recipeCollectionId, '66e38e02000efe75585c');

      console.log("Fetched recipe:", response);
      return response;
  } catch (error) {
      console.error('Error fetching recipe', error);
      throw error;
  }
};
const fetchTagsFromAppwrite = async (collectionId) => {
  try {
    const databases = new Databases(client);
    const response = await databases.listDocuments(
      databaseId,  // Replace with your database ID

      collectionId          // Pass the collection ID (dietary or allergy)
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

export const getDietaryRestrictions = async () => {
  try {
    const response = await database.getDocument(databaseId, filtersId, dietId);
    return response.dietaryRestrictions;
  } catch (error) {
    console.error('Error fetching dietary restrictions:', error);
    return [];
  }
};

export const getAllergies = async () => {
  try {
    const response = await database.getDocument(databaseId, filtersId, dietId);
    return response.allergy;
  } catch (error) {
    console.error('Error feteching Allergies:', error)
  };
};

export const getMealType = async () => {
  try {
    const response = await database.getDocument(databaseId, filtersId, mealId);
    return response.MealType;
  } catch (error) {
    console.error('Error fetching Meal Type:', error)
  }
};
export const getCuisine = async () => {
  try {
    const response = await database.getDocument(databaseId, filtersId, cuisineId);
    return response.cuisine;
  } catch (error) {
    console.error('Error fetching Cuisine: ', error)
  }
};
export const getCost = async () => {
  try {
    const response = await database.getDocument(databaseId, filtersId, costId);
    return response.cost;
  } catch (error) {
    console.error('Error fetching Costs: ', error)
  }
};
export const saveCustomTag = async (tag, collectionId) => {
  try {
    await databases.createDocument(databaseId, collectionId, 'unique()', {
      name:tag,
    });
    console.log('Custom tag added successfully: ', tag);
  } catch (error) {
    console.error('Error saving custom tag: ', error);
  }
};

export const addOnboardTag = async (tag, isDietarySection) => {
  const dietAllergy = isDietarySection ? dietId : allergyId;

  try {
    const document = await database.getDocument(databaseId, recipeCollectionId, dietAllergy);

    const currentTags = isDietarySection
    ? document.dietaryRestrictions
    : document.allergy;

    const updatedTags = [...currentTags, tag];

    await database.updateDocument(databaseId, recipeCollectionId, dietAllergy, {
      dietaryRestrictions: isDietarySection ? updatedTags : document.dietaryRestrictions,
      allergy: isDietarySection ? updatedTags : document.allergy,
    });

    console.log('Custom tag added successfully: ', tag);
  } catch (error) {
    console.error('Error adding custom tag: ', error)
  }
};

export const addIngredientsToGroceryList = async (ingredients) => {
  try {
    // Add ingredients to the grocery list document
    const existingList = await databases.listDocuments(databaseId, COLLECTION_ID);
    const currentGroceryList = existingList.documents[0]?.groceryList || [];

    const updatedGroceryList = [...currentGroceryList, ...ingredients];

    // Update the grocery list document
    await database.updateDocument(databaseId, COLLECTION_ID, existingList.documents[0].$id, {
      groceryList: updatedGroceryList,
    });

    console.log('Ingredients added to grocery list');
  } catch (error) {
    console.error('Error adding ingredients to grocery list:', error);
  }
};

export const getGroceryList = async () => {

  try {
    const response = await databases.listDocuments(databaseId, COLLECTION_ID);
    return response.documents[0].groceryList || [];
  } catch (error) {
    console.error('Error fetching grocery list:', error);
    return [];
  }
};

export const addNewRecipe = async (recipe) => {
  try {
    const response = await database.createDocument(
      databaseId,
      recipeCollectionId,
      'unique()',
      recipe
    );
    console.log('Recipe added: ', response);
    return response;
  } catch (error) {
    console.error('Error adding Recipe: ', error);
    throw new Error('Could not add recipe to Appwrite.');
    
  }
};
// com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback
// com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback
// yarn install # Install dependencies
// expo prebuild # Generate the native source code
// expo run:ios # Run on iOS device
// expo run:android # Run on Android device