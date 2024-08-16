import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { recipes } from '../constants/recipeindex';

const SmallRecipeCard = ({ item, onPress, toggleBookmark, isBookmarked}) => {
    return (
        <TouchableOpacity style={styles.smallCard} onPress={onPress}>
            <Image source={item.image} style={styles.smallImage} />
            <View style={styles.infoContainer}>
                <View style={styles.ratingBookmarkContainer}>
                    <Rating 
                        type="star"
                        ratingCount={5}
                        imageSize={12}
                        startingValue={item.rating}
                        readonly
                    />
                    <TouchableOpacity onPress={toggleBookmark}>
                        <Ionicons 
                            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={16}
                            color={isBookmarked ? 'green' : 'grey'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.smallTitle}>{item.title}</Text>
            </View>
            <Text style={styles.creator}>Created by: {item.creator}</Text>
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