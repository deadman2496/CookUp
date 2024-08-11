// In screens/RecipeDetailScreen.js
import React, {useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
import { recipes, featuredRecipes } from '../constants/recipeindex';

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
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterToggle = (key, value) => { 
        setSelectedFilters(prevFilters => ({
          ...prevFilters,
          [key]: value,
        }));
      };

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
    <ScrollView style={StyleSheet.container}>
      <Image source={recipe.Image} style={styles.image} />
      <View style={styles.infoContainer}>
      <Text style={styles.title}>{recipe.title}</Text>

      {/* User defined filters */}
      <View style={styles.filtersContainer}>
        {recipe.filters && recipe.filters.map(filter => (
          <View key={filter.key} style={styles.filterItem}> 
            <Text style={styles.filterLabel}>{filter.label}</Text>
            <Picker
              selectedValue={selectedFilters[filter.key]}
              style={styles.Picker}
              onValueChange={(itemValue) => handleFilterToggle(filter.key, itemValue)}
            >
              {filter.options.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}

            </Picker>
          </View>
        ))}

      </View>

      <View style={styles.detailsRow}>
        <View style={[styles.detailItem, styles.detailBorderRight]}>
          <Text style={styles.detailTitle}>
            Servings
          </Text>
          <Text>
            {recipe.servings}
          </Text>
        </View>
        <View style={[styles.detailItem, styles.detailBorderRight]}>
          <Text style={styles.detailTitle}>
            Prep Time
          </Text>
          <Text>
            {recipe.prepTime}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>
            Cook Time
          </Text>
          <Text>
            {recipe.cookTime}
          </Text>
        </View>
        
      </View>
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
            name={saved ? 'bookmark' : 'bookmark-outline'}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
    },
    infoContainer: {
      padding: 10,
    },
    rating: {
      flex: 1,
    },
    saveIcon: {
      padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    filtersContainer: { 
      marginBottom: 10,
    },
    filterItem: {
      marginBottom: 10,
    },
    filterLabel: {
      fontSize: 16,
      marginBottom: 5,
    },
    picker: {
      height: 50,
      width: '100%',
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    detailBorderRight: {
      borderRightWidth: 1,
      borderRightColor: '#ccc',
    },
    detailTitle: {
      fontWeight: 'bold',
    },
    detailText: {
      fontSize: 16,
    },
    }
);

export default RecipeDetailScreen;
