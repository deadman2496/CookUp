import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useFavorite } from '../contexts/BookmarkContext';
import FilterTag from './FilterTags';

const MediumRecipeCard = ({ item, onPress }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorite();

    const handleBookmarkToggle = () => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
     };
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
                    <TouchableOpacity onPress={handleBookmarkToggle}>
                        <Ionicons
                            name={isFavorite(item.id) ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.mediumTitle}>{item.title}</Text>
                <View style={styles.filtersContainer}>
                    {item.mealType.map((mealType, index) => (
                            <FilterTag
                            key={index}
                            label={mealType}
                            selected={true} // Recipe cards filters are not interactive, so true for filled in color
                            type="mealType"
                            />
                        ))}
                        {item.cuisine.map((cuisine, index) => (
                            <FilterTag
                            key={index}
                            label={cuisine}
                            selected={true} // Recipe cards filters are not interactive, so true for filled in color
                            type="cuisine"
                            />
                        ))}
                </View>
                <Text style={styles.creator}>Created by: {item.username}</Text>
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