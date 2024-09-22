// In screens/RecipeDetailScreen.js
import React, {useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Modal, Button, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFavorite } from '../contexts/BookmarkContext';
import UnitConverter from '../constants/conversionTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterTag from '../components/FilterTags';
import { addGroceryItem } from '../lib/appwrite';

//this imports recipes from the back-end must turn off calling from recipe index
// calls upon recipes offline MOSTLY FOR DEBUGGING ONLY
import { useRecipes } from '../contexts/RecipeContext';
import { recipes } from '../constants/recipeindex';

// calls upon back-end recipes change back-end at recipe caller 
import { getRecipeById } from '../utils/RecipeCaller';

const DEBUG_MODE = true;

const RecipeDetailScreen = ({ route, navigation }) => {
    const { documentId } = route.params;
    const [saved, setSaved] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const { isFavorite, addFavorite, removeFavorite } = useFavorite();
    const [ modalVisible, setModalVisible ] = useState(false);
    const [recipe, setRecipe ] = useState(null);
    const [loading, setLoading ] = useState(null);
    const [routes] = useState([
      { key: 'ingredients', title: 'Ingredients' },
      { key: 'instructions', title: 'Instructions' },
      ]);

      //this calls upon the recipes stored in the back end
    // useEffect(() => {
    //   const fetchRecipe = async () => {
    //     try {
    //       console.log("Fetching recipe with ID:", documentId);

    //       const fetchedRecipe = await getRecipeById(documentId);

    //       console.log("Fetched recipe from Appwrite:", fetchedRecipe);

    //       setRecipe(fetchedRecipe);
    //     } catch (error) {
    //       console.error('Failed to fetch recipe:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchRecipe();
    // }, [documentId]);

    // //this calls on the recipe in the local files
    // useEffect (() => {
    //   const fetchedRecipe = recipes.find(r => r.id === documentId);
    // }, [documentId])

    // if (!recipe) {
    //   return (
    //     <View>
    //       <Text>Loading....</Text>
    //     </View>
    //   );
    // }

    useEffect(() => {
      const fetchRecipe = async () => {
          setLoading(true);
          if (DEBUG_MODE) {
              // Fetch recipe from local context (hardcoded)
              const localRecipe = recipes.find((r) => r.id === documentId);
              setRecipe(localRecipe);
          } else {
              // Fetch recipe from back-end
              try {
                  const fetchedRecipe = await getRecipeById(documentId);
                  setRecipe(fetchedRecipe);
              } catch (error) {
                  console.error('Error fetching recipe from backend:', error);
              }
          }
          setLoading(false);
      };
      fetchRecipe();
  }, [documentId]);

  if (loading) {
      return (
          <View>
              <Text>Loading....</Text>
          </View>
      );
  }

  if (!recipe) {
      return (
          <View>
              <Text>Recipe not found</Text>
          </View>
      );
  }

    const handleBookmarkToggle = () => {
      if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe);
      }
     };

    

    
    const handleAddReviewPress = () => {
      navigation.navigate('AddReviewPage', { recipe, onAddReview: (newReview) => {
        recipe.reviews.push(newReview);
        recipe.reviewCount += 1;
      } });
      alert('add a review now.');
     };

    // const handleFilterToggle = (key, value) => { 
    //     setSelectedFilters(prevFilters => ({
    //       ...prevFilters,
    //       [key]: value
    //     }));
    //   };

    const handleTagPress = (filter) => {
      setSelectedFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((item) => item !== filter)
          : [...prev, filter]
      );
    };
    
    const handleReviewPress = () => {
      navigation.navigate('ReviewPage', { reviews: recipe.reviews, recipe });
    };


    const toggleSave = () => { 
        setSaved(!saved);
    };

    // const IngredientsRoute = () => (
    //   <ScrollView style={styles.tabContainer}>
    //       {recipe.ingredients.map((ingredient, index) => (
    //         <Text key={index} style={styles.tabText}>
    //           {ingredient}
    //           </Text>
    //       ))}
    //   </ScrollView>
    // );
    const IngredientsRoute = () => (
      <ScrollView style={styles.tabContainer}>
        {recipe?.ingredients ? (
          recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.tabText}>
              {ingredient}
            </Text>
          ))
        ) : (
          <Text>No ingredients available</Text>
        )}
      </ScrollView>
    );

    // const InstructionsRoute = () => (
    //   <ScrollView style={styles.tabContainer}>
    //     {recipe.instructions.map((instruction, index) => (
    //       <Text key={index} style={styles.tabText}>
    //         {index + 1}. {instruction}
    //         </Text>
    //     ))}
    //   </ScrollView>
    //  );

     const InstructionsRoute = () => (
      <ScrollView style={styles.tabContainer}>
        {recipe?.instructions ? (
          recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.tabText}>
              {index + 1}. {instruction}
            </Text>
          ))
        ) : (
          <Text>No ingredients available</Text>
        )}
      </ScrollView>
    );

    const addIngredientsToGroceryList = async () => {
      try {
        const groceryList = recipe.ingredients.map((ingredient) => ({
          name : ingredient,
          recipe: recipe.title,
        }));

        await addGroceryItem(groceryList);

        alert('Ingredients added to Grocery List!')
      } catch (error) {
        console.error('Error adding ingredients to Grocery List: ', error);
      }
    };


  return (
    <ScrollView style={StyleSheet.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.image || recipe.imageUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        {/* contains title, reviews, who it was created by and the bookmark icon */}
      <View style={styles.headerRow}>
        <Text style={styles.creatorText}>by {recipe.creator || recipe.username}</Text>
        <View style={styles.ratingRow}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          onFinishRating={(rating) => console.log("Rated: ", rating)}
          style={styles.rating}
          ratingContainerStyle={{backgroundColor: 'transparent'}}
        />
        <TouchableOpacity onPress={handleReviewPress}>
          <Text style={styles.ratingCount}>({recipe.ratingCount} reviews)</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookmarkToggle}>
          <Ionicons
            name={isFavorite(recipe.id) ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color='green'
            style={styles.saveIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{recipe.title}</Text>
      {/* filter section */}
      <View style={styles.filtersContainer}>
      {recipe.mealType.map((mealType, index) => (
        // <View key={index} style={styles.filterTag}>
        //   <Text style={styles.filterText}>{mealType}</Text>
        // </View>
        <FilterTag 
          key={index}
          label={mealType}
          selected={selectedFilters.includes(mealType)}
          onPress={() => handleTagPress(mealType)}
        />
          ))}
          {recipe.dietaryPreferences.map((dietaryPreferences, index) => (
          //   <View key={index} style={styles.filterTag}>
          //   <Text style={styles.filterText}>{dietaryPreferences}</Text>
          // </View>
        <FilterTag 
        key={index}
        label={dietaryPreferences}
        selected={selectedFilters.includes(dietaryPreferences)}
        onPress={() => handleTagPress(dietaryPreferences)}
      />
          ))}
          {recipe.cuisine.map((cuisine, index) => (
          // <View key={index} style={styles.filterTag}>
          //   <Text style={styles.filterText}>{cuisine}</Text>
          // </View>
          
        <FilterTag 
        key={index}
        label={cuisine}
        selected={selectedFilters.includes(cuisine)}
        onPress={() => handleTagPress(cuisine)}
      />
            
          ))}
          {/* {recipe.averageCost.map((averageCost, index) => (
            <View key={index} style={styles.filterTag}>
              <Text style={styles.filterText}>{averageCost}</Text>
            </View>
          ))} */}
      </View>

      {/* imported from Back end Filter Section */}
      {/* {recipe.tags.map((tag, index) => (
        <View key={index} style={styles.filterTag}>
          <Text style={styles.filterText}>{tag}</Text>
        </View>
      ))} */}

      {/* contains the sections for serving sizes, preparation time, and time to cook */}
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

      {/* this is the visual section for the ingredients tab and instructions tab. */}
      <View style={styles.tabViewContainer}>
      <TabView
        navigationState={{ index, routes}}
        renderScene={SceneMap({
          ingredients: IngredientsRoute,
          instructions: InstructionsRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.tabView}
      />
      </View>

        {/* this contains the option to add a review as well as the option to customize the recipe */}
      <View style={styles.reviewPromptContainer}>
        <Text style={styles.reviewPromptText}>Have you made this recipe?</Text>
        <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReviewPress}>
          <Text style={styles.addReviewButtonText}>Add a Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addButtonContainer}>
        <Button title="Add to Grocery List" onPress={addIngredientsToGroceryList} />
      </View>

      <View>
        <Button title="Customize" onPress={() => setModalVisible(true)} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View>
            <UnitConverter />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>

      
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
    headerRow:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },  
    ratingRow:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    ratingValue: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
    },
    reviewCount: {
      fontSize: 14,
      color: '#666',
      marginLeft: 10,
    },
    creatorText: {
      fontSize: 16,
      color: '#666',
    },
    rating: {
      marginHorizontal: 10,
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
      flexDirection: 'row',
      flexWrap: 'wrap', 
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterText:{
      fontSize: 14,
    },
    filterTag: {
      backgroundColor: '#e0e0e0',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 5,
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
    tabView:{
      flex: 1,
    },
    tabViewContainer:{
      flex: 1,
      height: Dimensions.get('window').height - 400,
    }, 
    tabContainer: {
      padding: 15,
    },
    tabText: {
      fontSize: 16,
      marginBottom: 10,
    },
    reviewPromptContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#f9f9f9',
      borderTopWidth: 1,
      borderColor: '#e0e0e0',
     },
    reviewPromptText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    addReviewButton: {
      backgroundColor: '#ff6347',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
    },
    addReviewButtonText: {
      color: '#fff',
      fontSize: 16,
    },
});

export default RecipeDetailScreen;
