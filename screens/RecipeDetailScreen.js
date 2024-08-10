// In screens/RecipeDetailScreen.js
import React, {useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { TabView, SceneMap } from 'react-native-tab-view';
import poundCake from "../assets/images/pc.png";
import ChocoCake from '../assets/images/Chocolate_cake.png';
import PastaCarbonara from '../assets/images/Pasta_Carbonara.png';
import CheesePizza from '../assets/images/Cheese_Pizza.png';
import CaesarSalad from '../assets/images/Caesar_Salad.png';
import PoundCake from '../assets/images/Traditional_Pound_Cake.png';
import SpanishFlan from '../assets/images/Spanish_Flan.png';
import ChickenTeriyaki from '../assets/images/Chicken_Teriyaki.png';

const recipeImages = {
    ChocoCake,
    PastaCarbonara,
    CheesePizza,
    CaesarSalad,
    PoundCake,
    SpanishFlan,
    ChickenTeriyaki,
    poundCake,
};

const RecipeDetailScreen = ({ route }) => {
    const { recipe } = route.params;
    const [saved, setSaved] = useState(false);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'ingredients', title: 'Ingredients' },
        { key: 'instructions', title: 'Instructions' },
     ]);

    const toggleSave = () => { 
        setSaved(!saved);
    };

    const IngredientsRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
            <Text>Ingredients</Text>
        </View>
     );

     const InstructionsRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
          <Text>Instructions here...</Text>
        </View>
      );
      
      const renderScene = SceneMap({
        ingredients: IngredientsRoute,
        instructions: InstructionsRoute,
      });



  return (
    <View style={StyleSheet.container}>
      <Image source={recipeImages} style={styles.image} />
      <View style={styles.infoContainer}>
      <Text> style={styles.title}Chocolate Cake</Text>
                <View style={styles.ratingContainer}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={30}
          onFinishRating={(rating) => console.log("Rated: ", rating)}
          style={styles.rating}
        />
        <TouchableOpacity onPress={toggleSave}>
          <Ionicons
            name={saved ? 'ios-heart' : 'ios-heart-outline'}
            size={30}
            color={saved ? 'red' : 'grey'}
            style={styles.saveIcon}
          />
        </TouchableOpacity>
      </View>
      <TabView
  navigationState={{ index, routes }}
  renderScene={renderScene}
  onIndexChange={setIndex}
  style={styles.tabView}
/>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 200,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    rating: {
      flex: 1,
    },
    saveIcon: {
      padding: 10,
    },
  });

export default RecipeDetailScreen;
