import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import ProgressIndicator from '../../components/ProgressIndicator';
import CustomHeader from '../../components/CustomHeader';

const StepThree = ({ navigation, route }) => {
    const { firstName, lastName, phoneNumber } = route.params;
    const [username, setUserName] = useState('');

    const handleNext = () => {
        navigation.navigate('StepFour', { firstName, lastName, phoneNumber, username });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <ProgressIndicator currentStep={3} />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a Username</Text>
                    <Text style={styles.message}>Choose a combination of numbers and letters to display on your profile</Text>
                </View>
                <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUserName}
            />
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>    
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

export default StepThree;
