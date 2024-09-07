import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Modal, CheckBox, Alert, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { recipes } from '../constants/recipeindex';
import MediumRecipeCard from '../components/MediumRecipeCard';
import { extractFilters } from '../utils/filters';
import { useRecipes } from '../contexts/RecipeContext';
import { getAllRecipes } from '../utils/RecipeCaller';


const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    mealType: [],
    cuisine: [],
    dietaryPreferences: [],
  });
  const [modalFilters, setModalFilters] = useState({
    mealType: [],
    cuisine: [],
    dietaryPreferences: [],
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customFilterModalVisible, setCustomFilterModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ mealTypes: [], cuisines: [], dietaryPreferences: [] });

  const [customMealType, setCustomMealType] = useState('');
  const [customCuisine, setCustomCuisine] = useState('');
  const [customDietaryPreference, setCustomDietaryPreference] = useState('');
  const [customFilterType, setCustomFilterType] = useState('');
  const [customFilterValue, setCustomFilterValue] = useState('');

  // useEffect(() => {
  //   setFilteredRecipes(shuffleArray(recipes));
  //   setFilterOptions(extractFilters(recipes));
  // }, []);

  useEffect(() => {
    async function fetchRecipes() {
      const allRecipes = await getAllRecipes();
      setFilteredRecipes(allRecipes);
    }
    fetchRecipes();
  }, []);


  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterRecipes(query, selectedFilters, modalFilters);
   }

  const filterRecipes = (query, selectedFilters, modalFilters) => {
    let filtered = recipes.filter((recipe) => {
        const matchesSearchQuery = recipe.title.toLowerCase().includes(query.toLowerCase());

        const matchesSelectedMealType =
            selectedFilters.mealType.length === 0 ||
            selectedFilters.mealType.includes(recipe.mealType);

        const matchesSelectedCuisine =
            selectedFilters.cuisine.length === 0 ||
            selectedFilters.cuisine.includes(recipe.cuisine);

        const matchesSelectedDietaryPreferences =
            selectedFilters.dietaryPreferences.length === 0 ||
            selectedFilters.dietaryPreferences.some((preference) =>
                recipe.dietaryPreferences.includes(preference)
            );
        const matchesModalMealType =
            modalFilters.mealType.length === 0 ||
            modalFilters.mealType.includes(recipe.mealType);

        const matchesModalCuisine =
            modalFilters.cuisine.length === 0 ||
            modalFilters.cuisine.includes(recipe.cuisine);

        const matchesModalDietaryPreferences =
            modalFilters.dietaryPreferences.length === 0 ||
            modalFilters.dietaryPreferences.some((preference) =>
                recipe.dietaryPreferences.includes(preference)
            );

        return matchesSearchQuery && matchesSelectedMealType && matchesSelectedCuisine && matchesSelectedDietaryPreferences
        && matchesModalMealType && matchesModalCuisine && matchesModalDietaryPreferences;
    });
    setFilteredRecipes(filtered);
};
  const handleHorizontalFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => {
    const updatedFilters = prevFilters[filterName].includes(value)
    ? prevFilters[filterName].filter((item) => item !== value)
    : [...prevFilters[filterName], value];

    filterRecipes(searchQuery, { ...selectedFilters, [filterName]: updatedFilters }, modalFilters);

    return { ...selectedFilters, [filterName]: updatedFilters };
    });
  };

   const handleModalFilterChange = (filterName, value) => {
    setModalFilters((prevFilters) => {
      const updatedFilters = prevFilters[filterName].includes(value)
        ? prevFilters[filterName].filter((item) => item !== value)
        : [...prevFilters[filterName], value];

        return { ...prevFilters, [filterName]: updatedFilters };
    });
   };

   

   const handleAddCustomFilter = () => {
    if (!customFilterValue.trim()){
      Alert.alert("Invalid Input", "Filter value cannot be empty");
      return;
    }

    setFilterOptions((prevOptions) => {
      const updatedOptions = {...prevOptions};

      if (!updatedOptions[customFilterType].includes(customFilterValue)){
        updatedOptions[customFilterType].push(customFilterValue);
      }

      return updatedOptions;
     });

     setCustomFilterValue('');
     setCustomFilterModalVisible(false);

     setMainModalVisible(true);
   };

   const applyModalFilters = () => {
    filterRecipes(searchQuery, selectedFilters, modalFilters);
    setMainModalVisible(false);
   };

   const openCustomFilterModal = (filterType) => {
      setCustomFilterType(filterType);
      setMainModalVisible(false);
      setCustomFilterModalVisible(true);
   };

   return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchContainer}>
      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="find a recipe..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      {/* Filter button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setMainModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
      </View>

      {/* Filter modal */}
      <Modal
                animationType="slide"
                transparent={true}
                visible={mainModalVisible}
                onRequestClose={() => setMainModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Filters</Text>

                        {/* Meal Type Filters */}
                        <Text style={styles.filterTitle}>Meal Type</Text>
                        <View style={styles.filterContainer}>
                        {filterOptions.mealTypes.map((mealType) => (
                            <TouchableOpacity 
                              key={mealType} 
                              onPress={() => handleModalFilterChange('mealType', mealType)}
                              style={[
                                styles.filterButtonRound,
                                modalFilters.mealType.includes(mealType) && styles.selectedFilterRound,
                              ]}
                              >
                                <Text style={styles.filterButtonTextRound}>
                                    {mealType}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        </View>

                        {/* Cuisine Filters */}
                        <Text style={styles.filterTitle}>Cuisine</Text>
                        <View style={styles.filterContainer}>
                        {filterOptions.cuisines.map((cuisine) => (
                            <TouchableOpacity 
                              key={cuisine} 
                              onPress={() => handleModalFilterChange('cuisine', cuisine)}
                              style={[
                                styles.filterButtonRound,
                                modalFilters.cuisine.includes(cuisine) && styles.selectedFilterRound,
                              ]}
                              >
                                <Text style={styles.filterButtonTextRound}>
                                    {cuisine}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                        {/* <TextInput
                          style={styles.input}
                          placeholder='add custom cuisine'
                          value={customCuisine}
                          onChangeText={setCustomCuisine}
                        /> */}
                        <Button 
                          title="Add Cuisine" 
                          onPress={() => openCustomFilterModal('cuisines')} 
                          style={styles.filterButtonRound}  
                        />

                        {/* Dietary Preferences Filters */}
                        <Text style={styles.filterTitle}>Dietary Preferences</Text>
                        <View style={styles.filterContainer}>
                        {filterOptions.dietaryPreferences.map((preference) => (
                            <TouchableOpacity 
                              key={preference} 
                              onPress={() => handleModalFilterChange('dietaryPreferences', preference)}
                              style={[
                                styles.filterButtonRound,
                                modalFilters.dietaryPreferences.includes(preference) && styles.selectedFilterRound,
                              ]}
                              >
                                <Text style={styles.filterButtonTextRound}>
                                    {preference}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                        {/* <TextInput
                          style={styles.input}
                          placeholder='add custom dietary preference'
                          value={customDietaryPreference}
                          onChangeText={setCustomDietaryPreference}
                        /> */}
                        <Button 
                          title="Add Dietary Preference" 
                          onPress={() => openCustomFilterModal('dietaryPreferences')} 
                          style={styles.filterButtonRound}
                        />

                        {/* Add more filters as needed */}

                        {/* Apply Filters Button */}
                        <Button
                            title="Apply Filters"
                            onPress={applyModalFilters}
                        />
                        <Button
                          title='Close'
                          onPress={() => setMainModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>

            {/* Custom Filter Modal */}
            <Modal
              animationType='slide'
              transparent={true}
              visible={customFilterModalVisible}
              onRequestClose={() => {
                setCustomFilterModalVisible(false);
                setMainModalVisible(true); //re-opens the main modal used for iOS 
              }}
            >
              <KeyboardAvoidingView 
                style={styles.modalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                <View style={styles.customModalContent}>
                  <Text style={styles.modalTitle}>Add Custom Filter</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`add ${customFilterType}`}
                    value={customFilterValue}
                    onChangeText={setCustomFilterValue} 
                  />
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.customButton, styles.addButton]}
                      onPress={handleAddCustomFilter}
                    >
                      <Text style={styles.customButtonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.customButton, styles.cancelButton]}
                      onPress={() => { 
                        setCustomFilterModalVisible(false);
                        setMainModalVisible(true);
                      }}
                    >
                      <Text style={styles.customButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>

      {/* Horizontal Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} styles={styles.filterScrollContainer}>
        {/* Meal Type Filters */}
        {filterOptions.mealTypes.map((mealType) => (
          <TouchableOpacity
            key={mealType}
            onPress={() => handleHorizontalFilterChange('mealType', mealType)}
            style={[
              styles.filterButtonRound,
              selectedFilters.mealType.includes(mealType) && styles.selectedFilterRound,
             ]}
          >
            <Text style={styles.filterButtonTextRound}>{mealType}</Text>
          </TouchableOpacity>
        ))}
        {/* Cuisine Filters */}
        {filterOptions.mealTypes.map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            onPress={() => handleHorizontalFilterChange('cuisine', cuisine)}
            style={[
              styles.filterButtonRound,
              selectedFilters.cuisine.includes(cuisine) && styles.selectedFilterRound,
             ]}
          >
            <Text style={styles.filterButtonTextRound}>{cuisine}</Text>
          </TouchableOpacity>
        ))}
        {/* Dietary Preferences Filters */}
        {filterOptions.mealTypes.map((preference) => (
          <TouchableOpacity
            key={preference}
            onPress={() => handleHorizontalFilterChange('dietaryPreferences', preference)}
            style={[
              styles.filterButtonRound,
              selectedFilters.mealType.includes(preference) && styles.selectedFilterRound,
             ]}
          >
            <Text style={styles.filterButtonTextRound}>{preference}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe list */}
      <FlatList 
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MediumRecipeCard 
            item={item}
            onPress={() => navigation.navigate('NoDrawerStack', { screen: 'Details', params: { recipe: item }, })}
          />
        )}
        numColumns={2}
      />
    </SafeAreaView>
   )

} ;

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
   },
   searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
   },
   searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',  
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
   },
   filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    },
   filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   },
   filterButton: {
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
   },
   filterScrollContainer: {
    flexDirection: 'row',
    marginBottom: 10,
   },
   filterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
   },
   filterButtonRound: {
    backgroundColor: '#eee',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
   },
    selectedFilterRound: {
      backgroundColor: '#ff6347',
    },
    filterButtonTextRound: {
      color: '#333',
    },
    selectedFilterTextRound: {
      color: '#fff',
    },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
   },
   modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
   },
   customModalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
   },
   buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
   },
   customButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
   },
   addButton: {
    backgroundColor: '#4cAF50',
   },
   cancelButton:{
    backgroundColor: '#ff6347',
   },
    customButtonText: {
      color: '#fff',
      textAlign: 'center',
    },
   modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
   },
   input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
   },
   filterOption: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
   },
   selectedFilter: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
    color: "#fff",
   },
   recipeCard: {
    padding: 15,
    borderColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
   },
   recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
   },
 });