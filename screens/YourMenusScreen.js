import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import SmallRecipeCard from '../components/SmallRecipeCard';
import { recipes } from '../constants/recipeindex';

const menus = [
    {
        id: '1',
        title: 'Breakfast Menu',
        backgroundColor: '#ffebcd',
        recipes: [
        {
            id: '1',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        {
            id: '2',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        {
            id: '3',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
    ],
    },
    {
        id: '2',
        title: 'Breakfast Menu',
        backgroundColor: '#ffebcd',
        recipes: [
        {
            id: '1',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        {
            id: '2',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        {
            id: '3',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
    ],
    },
    {
        id: '3',
        title: 'Breakfast Menu',
        backgroundColor: '#ffebcd',
        recipes: [
        {
            id: '1',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        
        {
            id: '2',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
        {
            id: '3',
            name: 'Gluten Free Protein Veggie Pizza',
            image: 'https://example.com/pizza-image.jpg',
            author: 'cassandrapde',
        },
    ],
    },
  // Add more menu items here...
];

const YourMenusPage = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.menuItem}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.menuTitle}>Menu Name</Text>
//         <Text style={styles.recipeTitle}>{item.name}</Text>
//         <Text style={styles.author}>by {item.author}</Text>
//       </View>
//       <TouchableOpacity style={styles.editButton}>
//         <Text style={styles.editButtonText}>edit</Text>
//       </TouchableOpacity>
//     </View>
//   );

     // Renders the horizontal recipe list for each menu
  const renderMenu = ({ item }) => (
    <View style={[styles.menuSection, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.recipes}
        renderItem={({ item }) => <SmallRecipeCard item={item} />}
        keyExtractor={(recipe) => recipe.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={menus}
        renderItem={renderMenu}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
      },
      container: {
        paddingBottom: 20,
      },
      menuSection: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
      },
      menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      editButton: {
        backgroundColor: '#f57c00',
        padding: 8,
        borderRadius: 5,
      },
      editButtonText: {
        color: '#fff',
        fontSize: 12,
      },
      flatListContainer: {
        paddingLeft: 10,
      },
});

export default YourMenusPage;
