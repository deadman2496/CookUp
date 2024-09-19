import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BookmarkContext } from '../contexts/BookmarkContext';

const YourMenusPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Your Menus Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default YourMenusPage;
