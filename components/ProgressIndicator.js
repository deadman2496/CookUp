import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProgressIndicator = ({ currentStep }) => {
    const steps = [1, 2, 3, 4];
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    <View
                        style={[
                            styles.circle,
                            { backgroundColor: currentStep >= step ? '#616260' : '#ccc' },
                        ]}
                    />
                    {index !== steps.length - 1 && (
                        <View style={styles.line} />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        paddingRight: 15,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    line: {
        width: 40,
        height: 2,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});

export default ProgressIndicator;
