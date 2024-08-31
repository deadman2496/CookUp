import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import ProgressIndicator from '../../components/ProgressIndicator';
import CustomHeader from '../../components/CustomHeader';

const StepOne = ({ navigation }) => {
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName] = useState('');

    const handleNext = () => {
        navigation.navigate('StepTwo', { firstName, lastName });
    };

    return (
        <View style={styles.container}>
        <View style={styles.input}>
            <ProgressIndicator currentStep={1} />
            <View style={styles.titleContainer}>
            <Text style={styles.title}>SignUp</Text>
            <Text style={styles.message}>Getting to know a little more about you to get the best personalization possible.</Text>
            </View>
            <TextInput 
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput 
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Button title="Next" onPress={handleNext} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontFamily: 'Poppins-SemiBold, Arial',
        fontSize: '34',
        color:'#4f753e',
        fontWeight: 'semibold',
        marginBottom: 15,
        marginTop: 15,
    },
    message: {
        fontFamily: 'Poppins-SemiBold, Arial',
        fontSize: '20',
        color:'#4f753e',
        fontWeight: 'semibold',
    },
    titleContainer:{
        paddingBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 18,
    },
});

export default StepOne;