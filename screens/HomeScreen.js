// In screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { recipes, featuredRecipes } from '../constants/recipeindex';
import { useNavigation } from '@react-navigation/native';
import SmallRecipeCard from '../components/SmallRecipeCard';
import MediumRecipeCard from '../components/MediumRecipeCard';
import LargeRecipeCard from '../components/LargeRecipeCard';
import { useFavorite } from '../contexts/BookmarkContext';

// calls upon recipes offline MOSTLY FOR DEBUGGING ONLY
import { useRecipes } from '../contexts/RecipeContext';

// calls upon back-end recipes change back-end at recipe caller 
import { getAllRecipes } from '../utils/RecipeCaller';

import Header from '../components/LoggedInHeader';

const DEBUG_MODE = true;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { favoriteRecipes } = useFavorite(); 
  
    // vvvv These variables are for the local Recipes. mostly for debugging.  vvvvvv
     const { recipes: localRecipes } = useRecipes();
  
    //This one is for use to call upon back-end programs 
    const [recipes, setRecipes ] = useState([]);

  // vvvvv These Variables go with the fetch recipes for use with the local Recipe Index. and Recipe Context. vvvv
  useEffect(() => {
    const fetchRecipes = async () => {
        if (DEBUG_MODE) {
            // Load hardcoded recipes from RecipeContext
            setRecipes(localRecipes);
        } else {
            // Fetch recipes from backend using RecipeCaller
            try {
                const backendRecipes = await getAllRecipes();
                setRecipes(backendRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
    };

    fetchRecipes();
}, [localRecipes]);
   
   // code for only the backend
    // useEffect(() => {
    //   const fetchRecipes = async () => {
    //     try {
    //       const fetchedRecipes = await getAllRecipes(); // Fetch recipes from Appwrite
    //       setRecipes(fetchedRecipes); // Set the fetched recipes to state
    //     } catch (error) {
    //       console.error('Error fetching recipes:', error);
    //     }
    //   };
  
    //   fetchRecipes();


  const recommendedRecipes = recipes.slice(0,5);
  const latestRecipes= recipes.slice(5,10); 

    // This Part calls upon the different sized Recipe Cards and places them within their designated zones.
   const renderSmallCard = ({ item }) => (
      <SmallRecipeCard 
        item={item}
        onPress={() => navigation.navigate("RecipeDetails", { documentId: item.id || item.$id },)}
      />
    );

    const renderMediumCard = ({ item }) => (
      <MediumRecipeCard 
        item={item}
        onPress={() => navigation.navigate("RecipeDetails",{ documentId: item.id || item.$id })}
      />
     );

  const renderLargeCard = ({ item }) => (
    <LargeRecipeCard 
      item={item}
      onPress={() => navigation.navigate("RecipeDetails", { documentId: item.id || item.$id })}
    />
  );

   return (
    <SafeAreaView style={styles.container}>
      <Header title="CookUp" isMenu={true}/>
      <ScrollView>
        <Text style={styles.sectionTitle}>On Your Menu</Text>
        {favoriteRecipes.length > 0 ? (
        <FlatList
          horizontal
          data={favoriteRecipes}
          renderItem={renderSmallCard}
          keyExtractor={(item) => item.$id}
          showsHorizontalScrollIndicator={false}
        />
        ) : (
          <Text style={styles.emptyText}>You haven't favorited any recipes yet!</Text>
        )}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <FlatList
          horizontal
          data={recommendedRecipes}
          renderItem={renderMediumCard}
          keyExtractor={item => item.$id}
          showsHorizontalScrollIndicator={false}
      />
        <Text style={styles.sectionTitle}>Your Feed</Text>
        <FlatList
          data={latestRecipes}
          renderItem={renderLargeCard}
          keyExtractor={item => item.$id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    horizontalList: {
        flexGrow: 0, // Prevents the FlatList from wanting to fill the height of the ScrollView
      },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
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
    smallCard: {
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
    smallImage:{
      width: '100%',
      height: 80,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    smallTitle: {
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
    },
    mediumCard: {
      width: 150,
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
      height: 100 ,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    mediumTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
    largeCard:{
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
    creator:{
      fontSize: 14,
      color: '#666',
      marginTop: 10,
    },
    });

export default HomeScreen;
