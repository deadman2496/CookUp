import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ProgressIndicator from '../../components/ProgressIndicator';

const StepThree = ({ navigation, route }) => {
    const { firstName, lastName, phoneNumber } = route.params;
    const [username, setUsername] = useState('');

    const handleNext = () => {
        navigation.navigate('StepFour', { firstName, lastName, phoneNumber, username });
    };

    return (
        <View style={styles.container}>
            <ProgressIndicator currentStep={3} />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Next" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default StepThree;
