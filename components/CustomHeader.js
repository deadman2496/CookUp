import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library

const CustomHeader = ({ currentStep, totalSteps, onBack, onSkip }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Progress Dots */}
            <View style={styles.dotContainer}>
                {Array.from({ length: totalSteps }, (_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, currentStep === index ? styles.activeDot : styles.inactiveDot]}
                    />
                ))}
            </View>

            {/* Skip Button */}
            {onSkip && (
                <TouchableOpacity onPress={onSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    backText: {
        fontSize: 16,
        color: 'blue',
    },
    skipText: {
        fontSize: 16,
        color: 'blue',
    },
    dotContainer:{
        flexDirection: 'row',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'blue',
    },
    inactiveDot:{
        backgroundColor: 'gray',
    },
    backButton: {
        paddingRight: 15,
    },
    progressContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressBar: {
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50', // Green color for the progress bar
    },
});

export default CustomHeader;
