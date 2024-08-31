import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ProgressIndicator from '../../components/ProgressIndicator';

const StepTwo = ({ navigation, route }) => {
    const { firstName, lastName } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNext = () => {
        navigation.navigate('StepThree', { firstName, lastName, phoneNumber });
    };

    return (
        <View style={styles.container}>
            <ProgressIndicator currentStep={2} />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
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

export default StepTwo;
