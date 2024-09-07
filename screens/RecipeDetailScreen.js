// In screens/RecipeDetailScreen.js
import React, {useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Modal, Button, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFavorite } from '../contexts/BookmarkContext';
import UnitConverter from '../constants/conversionTable';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [saved, setSaved] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState({});
    const { isFavorite, addFavorite, removeFavorite } = useFavorite();
    const [ modalVisible, setModalVisible ] = useState(false);

    const handleBookmarkToggle = () => {
      if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe);
      }
     };

    
    const [routes] = useState([
      { key: 'ingredients', title: 'Ingredients' },
      { key: 'instructions', title: 'Instructions' },
      ]);

    const handleAddReviewPress = () => {
      navigation.navigate('AddReviewPage', { recipe, onAddReview: (newReview) => {
        recipe.reviews.push(newReview);
        recipe.reviewCount += 1;
      } });
      alert('add a review now.');
     };

    const handleFilterToggle = (key, value) => { 
        setSelectedFilters(prevFilters => ({
          ...prevFilters,
          [key]: value
        }));
      };

    const handleReviewPress = () => {
      navigation.navigate('ReviewPage', { reviews: recipe.reviews, recipe });
    };


    const toggleSave = () => { 
        setSaved(!saved);
    };

    const IngredientsRoute = () => (
      <ScrollView style={styles.tabContainer}>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.tabText}>
              {ingredient}
              </Text>
          ))}
      </ScrollView>
    );

    const InstructionsRoute = () => (
      <ScrollView style={styles.tabContainer}>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.tabText}>
            {index + 1}. {instruction}
            </Text>
        ))}
      </ScrollView>
     );




  return (
    <ScrollView style={StyleSheet.container} showsVerticalScrollIndicator={false}>
      <Image source={recipe.image} style={styles.image} />

      <View style={styles.infoContainer}>
        {/* contains title, reviews, who it was created by and the bookmark icon */}
      <View style={styles.headerRow}>
        <Text style={styles.creatorText}>by {recipe.creator}</Text>
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
        <View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.mealType}</Text>
        </View>
        <View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.cuisine}</Text>
        </View><View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.dietaryPreferences}</Text>
        </View><View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.averageCost}</Text>
        </View>
      </View>

      {/* imported from Back end Filter Section */}
      {recipe.tags.map((tag, index) => (
        <View key={index} style={styles.filterTag}>
          <Text style={styles.filterText}>{tag}</Text>
        </View>
      ))}

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
