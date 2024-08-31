import { account, createUser } from '../lib/appwrite';

// Function to handle user sign-up
export const signUpUser = async (email, password, fname, lname, username, pnumber) => {
    try{
        //const user = await account.create('unique()', email, password, firstname);
        createUser();
        return user;
    } catch (error){
        throw new Error(error.message);
    }
};

export const signInUser = async (email, password) => {
    try{
        const session = await account.createEmailSession(email, password);
        return !!session; // Returns true if session is activated
    } catch {
        return false;
    }
};

export const checkAuth = async () => {
    try {
        const session = await account.getSession('current');
        return !!session;
    } catch {
        return false;
    }
};

export const signOutUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error){
        throw new Error(error.message);
    }
};