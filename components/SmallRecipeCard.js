import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { recipes } from '../constants/recipeindex';
import { useFavorite } from '../contexts/BookmarkContext';

const SmallRecipeCard = ({ item, onPress}) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorite();
    const DEBUG_MODE = true;  // Toggle this to true for hardcoded data, false for backend


    const handleBookmarkToggle = () => {
        const recipeId = item.id || item.$id; //calls upon either id (the locally saved file) or $id (the one on the backend)
        if (isFavorite(recipeId)) {
            removeFavorite(recipeId);
        } else {
            addFavorite(item);
        }
    };


    return (
        <TouchableOpacity style={styles.smallCard} onPress={onPress}>
            <Image source={{ uri: item.image || item.imageUrl }} style={styles.smallImage} />
            <View style={styles.infoContainer}>
                <View style={styles.ratingBookmarkContainer}>
                    <Rating 
                        type="star"
                        ratingCount={5}
                        imageSize={12}
                        startingValue={item.rating || 0 }
                        readonly
                    />
                    <TouchableOpacity onPress={handleBookmarkToggle}>
                        <Ionicons 
                            name={isFavorite(item.id || item.$id) ? 'bookmark' : 'bookmark-outline'}
                            size={16}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.smallTitle}>{item.title}</Text>
            </View>
            <Text style={styles.creator}>Created by: {item.creator || item.username}</Text>
        </TouchableOpacity>
    );
 };

 const styles = StyleSheet.create({
    smallCard:{
        width: 120,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    smallImage: {
        width: '100%',
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer: {
        padding: 10,
    },
    smallTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingBookmarkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  });

  export default SmallRecipeCard;