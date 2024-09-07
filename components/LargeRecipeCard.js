import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useFavorite } from '../contexts/BookmarkContext';


const LargeRecipeCard = ({ item, onPress}) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorite();

    const handleBookmarkToggle = () => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
     };
    return (
        <TouchableOpacity style={styles.largeCard} onPress={onPress}>
            <Image source={item.image} style={styles.largeImage} />
            <View style={styles.infoContainer}>
                <View style={styles.ratingBookmarkContainer}>
                    <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={20}
                        startingValue={item.rating}
                        readonly
                    />
                    <TouchableOpacity onPress={handleBookmarkToggle}>
                        <Ionicons
                            name={isFavorite(item.id) ? 'bookmark' : 'bookmark-outline'}
                            size={24}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.largeTitle}>{item.title}</Text>
                <View style={styles.filtersContainer}>
                    <View style={styles.filterTag}>
                        <Text style={styles.filterText}>{item.cuisine}</Text>
                    </View>
                    <View style={styles.filterTag}>
                        <Text style={styles.filterText}>{item.dietaryPreferences}</Text>
                    </View>
                    <View style={styles.filterTag}>
                        <Text style={styles.filterText}>{item.averageCost}</Text>
                    </View>
                </View>
                <View style={styles.filtersContainer}>
                    {recipes.tags.map((tag, index) => (
                        <View key={index} style={styles.filterTag}>
                            <Text>{tag}</Text>
                        </View>
                    ))}
                </View>
                
                <Text style={styles.creator}>Created by: {item.creator}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    largeCard: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    largeImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer: {
        padding: 10,
    },
    ratingBookmarkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    largeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    filterTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginRight: 5,
        marginBottom: 5,
    },
    filterText: {
        fontSize: 14,
    },
    creator: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
});

export default LargeRecipeCard;