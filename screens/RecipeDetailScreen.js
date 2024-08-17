// In screens/RecipeDetailScreen.js
import React, {useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { TabView, SceneMap } from 'react-native-tab-view';



const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [saved, setSaved] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState({});

    
    const [routes] = useState([
      { key: 'ingredients', title: 'Ingredients' },
      { key: 'instructions', title: 'Instructions' },
      ]);

    const handleFilterToggle = (key, value) => { 
        setSelectedFilters(prevFilters => ({
          ...prevFilters,
          [key]: value
        }));
      };

    const handleReviewPress = () => {
      navigation.navigate('ReviewPage', { reviews: recipe.reviews });
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
      <View style={styles.headerRow}>
        <Text style={styles.creatorText}>by {recipe.creator}</Text>
        <View style={styles.ratingRow}>
          {/* <Text style={styles.ratingValue}>{recipe.rating.toFixed(1)}</Text> */}
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
        <TouchableOpacity onPress={toggleSave}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color={saved ? 'red' : 'grey'}
            style={styles.saveIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{recipe.title}</Text>

      {/* User defined filters //
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

      </View> */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.filters.mealType}</Text>
        </View>
        <View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.filters.cuisine}</Text>
        </View><View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.filters.dietaryPreferences}</Text>
        </View><View style={styles.filterTag}>
          <Text style={styles.filterText}>{recipe.filters.averageCost}</Text>
        </View>
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
    }
);

export default RecipeDetailScreen;
