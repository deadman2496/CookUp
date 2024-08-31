import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingStepThree = ({ navigation, route }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { selectedSize } = route.params;

    const handleNext = () => {
        if (selectedOption) {
            navigation.navigate('OnboardingStepFour', { selectedSize, selectedOption });
        } else {
            alert('Please select an option.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose an Option</Text>
            <Button title="Option 1" onPress={() => setSelectedOption('Option 1')} />
            <Button title="Option 2" onPress={() => setSelectedOption('Option 2')} />
            <Button title="Option 3" onPress={() => setSelectedOption('Option 3')} />
            <Button title="Option 4" onPress={() => setSelectedOption('Option 4')} />
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

export default OnboardingStepThree;
