import {Account, Client, ID } from 'react-native-appwrite';

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

const account = new Account(client);

export const createUser = () => {
    
// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});


}


