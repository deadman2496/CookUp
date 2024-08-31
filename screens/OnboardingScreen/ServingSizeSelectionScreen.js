import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingStepTwo = ({ navigation }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleNext = () => {
        if (selectedSize) {
            navigation.navigate('OnboardingStepThree', { selectedSize });
        } else {
            alert('Please select a serving size.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Serving Size</Text>
            <Button title="Small" onPress={() => setSelectedSize('Small')} />
            <Button title="Medium" onPress={() => setSelectedSize('Medium')} />
            <Button title="Large" onPress={() => setSelectedSize('Large')} />
            <Button title="Next" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default OnboardingStepTwo;
