import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const dietaryRestrictions = [
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Gluten-Free',
    'Keto',
    'Paleo',
];

const OnboardingStepFour = ({ navigation, route }) => {
    const [selectedRestrictions, setSelectedRestrictions] = useState([]);
    const { selectedSize, selectedOption } = route.params;

    const toggleRestriction = (restriction) => {
        setSelectedRestrictions((prev) =>
            prev.includes(restriction)
                ? prev.filter((r) => r !== restriction)
                : [...prev, restriction]
        );
    };

    const handleNext = () => {
        navigation.navigate('OnboardingStepFive', {
            selectedSize,
            selectedOption,
            selectedRestrictions,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Up Dietary Restrictions</Text>
            <FlatList
                data={dietaryRestrictions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Button
                        title={item}
                        onPress={() => toggleRestriction(item)}
                        color={selectedRestrictions.includes(item) ? 'green' : 'gray'}
                    />
                )}
            />
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

export default OnboardingStepFour;
