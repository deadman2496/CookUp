// In screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { recipes, featuredRecipes } from '../constants/recipeindex';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const RecipeCard = ({ item, horizontal }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Details', { recipe: item })}
      style={horizontal ? styles.horizontalCard : styles.card}
    >
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
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
        data={featuredRecipes}
        renderItem={({ item }) => <RecipeCard item={item} horizontal={true} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <FlatList
        horizontal
        data={featuredRecipes}
        renderItem={({ item }) => <RecipeCard item={item} horizontal={true} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
      <Text style={styles.sectionTitle}>Your Feed</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard item={item} />}
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
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      marginVertical: 8,
      elevation: 3, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        margin: 8,
        width: 200, // Set a fixed width for horizontal cards
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        flexDirection: 'column',
        alignItems: 'center',
      },
      cardImage: {
        width: 100, // Fixed width for image
        height: 100, // Fixed height for image
        marginRight: 10, // Margin right for spacing between image and text
      },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: 14,
      color: '#666',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
      },
    addButton: {
      backgroundColor: '#0066cc',
      borderRadius: 8,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    addButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    }
  });

export default HomeScreen;
