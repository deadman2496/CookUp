import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

const MediumRecipeCard = ({ item, onPress, toggleBookmark, isBookmarked }) => {
    return (
        <TouchableOpacity style={styles.mediumCard} onPress={onPress}>
            <Image source={item.image} style={styles.mediumImage} />
            <View style={styles.infoContainer}>
                <View style={styles.ratingBookmarkContainer}>
                    <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={16}
                        startingValue={item.rating}
                        readonly
                    />
                    <TouchableOpacity onPress={toggleBookmark}>
                        <Ionicons
                            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color={isBookmarked ? 'gold' : 'grey'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.mediumTitle}>{item.title}</Text>
                <View style={styles.filtersContainer}>
                    <View style={styles.filterTag}>
                        <Text style={styles.filterText}>{item.filters.mealType}</Text>
                    </View>
                    <View style={styles.filterTag}>
                        <Text style={styles.filterText}>{item.filters.cuisine}</Text>
                    </View>
                </View>
                <Text style={styles.creator}>Created by: {item.creator}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mediumCard: {
        width: 160,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    mediumImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer: {
        padding: 10,
    },
    mediumTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingBookmarkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filtersContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    filterTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginRight: 5,
        marginBottom: 5,
    },
    filterText: {
        fontSize: 12,
        color: '#666',
    },
});

export default MediumRecipeCard;