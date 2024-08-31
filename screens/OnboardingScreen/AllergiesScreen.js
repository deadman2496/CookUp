import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const predefinedAllergies = [
    'Peanuts',
    'Shellfish',
    'Dairy',
    'Soy',
    'Eggs',
];

const OnboardingStepFive = ({ navigation, route }) => {
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [customAllergy, setCustomAllergy] = useState('');
    const { selectedSize, selectedOption, selectedRestrictions } = route.params;

    const addCustomAllergy = () => {
        if (customAllergy.trim()) {
            setSelectedAllergies((prev) => [...prev, customAllergy.trim()]);
            setCustomAllergy('');
        }
    };

    const toggleAllergy = (allergy) => {
        setSelectedAllergies((prev) =>
            prev.includes(allergy)
                ? prev.filter((a) => a !== allergy)
                : [...prev, allergy]
        );
    };

    const handleFinish = () => {
        const onboardingData = {
            selectedSize,
            selectedOption,
            selectedRestrictions,
            selectedAllergies,
        };
        // Save the onboardingData or proceed with the app flow
        navigation.replace('Home'); // Navigate to the home screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Up Food Allergies</Text>
            <FlatList
                data={predefinedAllergies}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Button
                        title={item}
                        onPress={() => toggleAllergy(item)}
                        color={selectedAllergies.includes(item) ? 'green' : 'gray'}
                    />
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Add Custom Allergy"
                value={customAllergy}
                onChangeText={setCustomAllergy}
            />
            <Button title="Add Allergy" onPress={addCustomAllergy} />
            <Button title="Finish" onPress={handleFinish} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
});

export default OnboardingStepFive;