import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import {AirbnbRating} from 'react-native-elements';
import PropTypes from 'prop-types';
import {SharedElement} from 'react-navigation-shared-element';
import {useSelector} from ' react-redux';


const RecipeCard = ({
    category,
    meal,
    area,
    image,
    id,
    onPress,
    onLikePress,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const Favorites = useSelector(appSelectors.favorites);

    useEffect(() => {
        const favorite = Favorites.find(item => item.idMeal === id);
        setIsFavorite(!!favorite);
    }, [Favorites,id]);
  return (
    <TouchableOpacity
        style={styles.RecipeCard}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.RecipeCardMedia}>
            <View style={styles.RecipeCardLoveButton}>
                <AppLoveButton selected={isFavorite} onPress={onLikePress} />
            </View>
        </View>
        <View style={styles.AppRecipeCardImageContainer}>
            <SharedElement id={`item.${id}.photo`}>
                <FastImage 
                    style={styles.RecipeCardImage}
                    source={{
                        uri:image,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </SharedElement>
        </View>
        <View style={styles.RecipeCardContent}>
            <Text style={styles.RecipeCardCategory}>{category}</Text>
            <Text style={styles.RecipeCardMeal} numberOfLines={2}>
                {meal}
            </Text>
            <View style={styles.RecipeCardRating}>
                <AirbnbRating 
                    showRating={false}
                    defaultRating={3}
                    count={5}
                    size={10}
                />
            </View>
            <Text style={styles.RecipeCardCalories}>{area}</Text>
            <View style={styles.RecipeCardFooter}>
                <AppTextIcon label="10 mins" icon="time-outline" />
                <AppTextIcon label="1 serving" icon="fast-food-outline" />
            </View>
        </View>
    </TouchableOpacity>
  );
};

RecipeCard.propTypes = {
    category: PropTypes.string,
    meal: PropTypes.string,
    area: PropTypes.string,
    image: PropTypes.string,
    onPress: PropTypes.func,
};

export default RecipeCard;

const styles = StyleSheet.create({
    RecipeCard: {
      width: 150,
      minHeight: 210,
      borderRadius: 20,
      marginStart: 14,
      marginEnd: 14,
      backgroundColor: COLORS.superLight,
    },
    RecipeCardMedia: {
      position: 'relative',
      // width: '100%',
    },
    RecipeCardLoveButton: {
      position: 'absolute',
      zIndex: 10,
    },
    RecipeCardImageContainer: {},
    RecipeCardImage: {
      height: 90,
      width: '100%',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    RecipeCardContent: {
      padding: 16,
    },
    RecipeCardCategory: {
      fontSize: 8,
      lineHeight: 11,
      fontFamily: FONT_PRIMARY_MEDIUM,
      color: COLORS.blueShade,
      paddingBottom: 4,
    },
    RecipeCardMeal: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: FONT_PRIMARY_MEDIUM,
      color: COLORS.black,
      paddingBottom: 4,
    },
    RecipeCardCalories: {
      fontSize: 8,
      lineHeight: 11,
      fontFamily: FONT_PRIMARY_REGULAR,
      color: COLORS.orange,
      paddingBottom: 4,
    },
    RecipeCardRating: {
      alignSelf: 'flex-start',
    },
    RecipeCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  