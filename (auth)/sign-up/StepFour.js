import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { signUpUser } from '../../utils/auth'; 
import ProgressIndicator from '../../components/ProgressIndicator';
import { createUser, sendVerificationEmail } from '../../lib/appwrite';
import CustomHeader from '../../components/CustomHeader';

const StepFour = ({ navigation, route }) => {
    const { firstName, lastName, phoneNumber, username } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            //const user = await createUser(email, password, username, firstName, lastName, phoneNumber);
            //await sendVerificationEmail('');
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Onboard'); // Redirect to Sign In after successful sign-up
        } catch (error) {
            Alert.alert('Sign-Up Error:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <ProgressIndicator currentStep={4} />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
        >
            <View style={styles.titleContainer}>
                    <Text style={styles.title}>Enter your email and password</Text>
                </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Text style={styles.message}>Choose a combination of numbers and letters and capitalization to display on your profile</Text>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up!</Text>    
                </TouchableOpacity>
            </ScrollView>                
    </KeyboardAvoidingView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    safeArea:{
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent:{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins-SemiBold, Arial',
        fontSize: 34,
        color:'#4f753e',
        marginBottom: 15,
        marginTop: 15,
    },
    message: {
        fontFamily: 'Poppins-SemiBold, Arial',
        fontSize: 20,
        color:'#4f753e',
    },
    titleContainer:{
        paddingBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: 150,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold, Arial',
    },
});

export default StepFour;
