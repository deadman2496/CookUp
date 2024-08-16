// In screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { recipes, featuredRecipes } from '../constants/recipeindex';
import { useNavigation } from '@react-navigation/native';
import SmallRecipeCard from '../components/SmallRecipeCard';
import MediumRecipeCard from '../components/MediumRecipeCard';
import LargeRecipeCard from '../components/LargeRecipeCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const savedRecipes = recipes.filter(recipe => bookmarkedRecipes.includes(recipe.id));
  const recommendedRecipes = recipes.slice(0,5);
  const latestRecipes= recipes.slice(5,10); 

  const toggleBookmark = (id) => {
    if (bookmarkedRecipes.includes(id)) {
      setBookmarkedRecipes(bookmarkedRecipes.filter(recipeId => recipeId !== id));
    } else {
      setBookmarkedRecipes([...bookmarkedRecipes, id]);
    }
   };

   const renderSmallCard = ({ item }) => (
      <SmallRecipeCard 
        item={item}
        onPress={() => navigation.navigate('Details', { recipe: item })}
        toggleBookmark={() => toggleBookmark(item.id)}
        isBookmarked={bookmarkedRecipes.includes(item.id)}
      />
    );

    const renderMediumCard = ({ item }) => (
      <MediumRecipeCard 
        item={item}
        onPress={() => navigation.navigate('Details', { recipe: item })}
        toggleBookmark={() => toggleBookmark(item.id)}
        isBookmarked={bookmarkedRecipes.includes(item.id)}
      />
     );

  const renderLargeCard = ({ item }) => (
    <LargeRecipeCard 
      item={item}
      onPress={() => navigation.navigate('Details', { recipe: item })}
      toggleBookmark={() => toggleBookmark(item.id)}
      isBookmarked={bookmarkedRecipes.includes(item.id)}
    />
  );

   const VertiRecipeCard = ({ title, description, onPress}) => (
     <TouchableOpacity style={styles.card} onPress={onPress}>
       <Text style={styles.title}>{title}</Text>
       <Text style={styles.description}>{description}</Text>
     </TouchableOpacity>
   );

   return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
      <Text style={styles.sectionTitle}>On Your Menu</Text>
      <FlatList
        horizontal
        data={savedRecipes}
        renderItem={renderSmallCard}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <FlatList
        horizontal
        data={recommendedRecipes}
        renderItem={renderMediumCard}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Your Feed</Text>
      <FlatList
        data={latestRecipes}
        renderItem={renderLargeCard}
        keyExtractor={item => item.id}
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
    // card: {
    //   backgroundColor: 'white',
    //   borderRadius: 8,
    //   padding: 20,
    //   marginVertical: 8,
    //   elevation: 3, // Shadow for Android
    //   shadowColor: '#000', // Shadow for iOS
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 2,
    //   flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // horizontalCard: {
    //     backgroundColor: 'white',
    //     borderRadius: 8,
    //     padding: 20,
    //     margin: 8,
    //     width: 200, // Set a fixed width for horizontal cards
    //     elevation: 3,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 2,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //   },
    //   cardImage: {
    //     width: 100, // Fixed width for image
    //     height: 100, // Fixed height for image
    //     marginRight: 10, // Margin right for spacing between image and text
    //   },
    // cardTitle: {
    //   fontSize: 18,
    //   fontWeight: 'bold',
    // },
    // cardDescription: {
    //   fontSize: 14,
    //   color: '#666',
    // },
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
