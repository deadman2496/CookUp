import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingStepOne = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Recipe App!</Text>
            <Text style={styles.subtitle}>Let's get you started with a quick setup.</Text>
            <Button title="Get Started" onPress={() => navigation.navigate('OnboardingStepTwo')} />
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
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default OnboardingStepOne;
