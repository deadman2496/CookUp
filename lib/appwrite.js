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
};

// Init your React Native SDK
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


// com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback
// com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback
// yarn install # Install dependencies
// expo prebuild # Generate the native source code
// expo run:ios # Run on iOS device
// expo run:android # Run on Android device