import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Modal, CheckBox, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { recipes} from '../constants/recipeindex';
import MediumRecipeCard from '../components/MediumRecipeCard';
import { extractFilters } from '../utils/filters';


const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    mealType: [],
    cuisine: [],
    dietaryPreferences: [],
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customFilterModalVisible, setCustomFilterModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ mealTypes: [], cuisines: [], dietaryPreferences: [] });

  const [customMealType, setCustomMealType] = useState('');
  const [customCuisine, setCustomCuisine] = useState('');
  const [customDietaryPreference, setCustomDietaryPreference] = useState('');
  const [customFilterType, setCustomFilterType] = useState('');
  const [customFilterValue, setCustomFilterValue] = useState('');

  useEffect(() => {
    setFilteredRecipes(shuffleArray(recipes));
    setFilterOptions(extractFilters(recipes));
  }, []);


  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

  const handleSearch = () => {
    let filtered = recipes.filter((recipe) => {
      const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMealType =
      selectedFilters.mealType.length === 0 ||
      selectedFilters.mealType.includes(recipe.mealType);

      const matchesCuisine = 
        selectedFilters.cuisine.length === 0 ||
        selectedFilters.cuisine.includes(recipe.cuisine);

      const matchesDietaryPreferences =
          selectedFilters.dietaryPreferences.length === 0 ||
          selectedFilters.dietaryPreferences.some((preference) =>
            recipe.dietaryPreferences.includes(preference)
          );
      
          return matchesSearchQuery && matchesMealType && matchesCuisine && matchesDietaryPreferences;    
    });
    setFilteredRecipes(filtered);
   };

   const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => {
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
   };

   const openCustomFilterModal = (filterType) => {
      setCustomFilterType(filterType);
      setCustomFilterModalVisible(true);
   };

   return (
    <View style={styles.container}>

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
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
      </View>

      {/* Filter modal */}
      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
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
                              onPress={() => handleFilterChange('mealType', mealType)}
                              style={[
                                styles.filterButtonRound,
                                selectedFilters.mealType.includes(mealType) && styles.selectedFilterRound,
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
                              onPress={() => handleFilterChange('cuisine', cuisine)}
                              style={[
                                styles.filterButtonRound,
                                selectedFilters.cuisine.includes(cuisine) && styles.selectedFilterRound,
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
                              onPress={() => handleFilterChange('dietaryPreferences', preference)}
                              style={[
                                styles.filterButtonRound,
                                selectedFilters.dietaryPreferences.includes(preference) && styles.selectedFilterRound,
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
                            onPress={() => {
                                handleSearch();
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Custom Filter Modal */}
            <Modal
              animationType='slide'
              transparent={true}
              visible={customFilterModalVisible}
              onRequestClose={() => setCustomFilterModalVisible(false)}
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
                      onPress={() => setCustomFilterModalVisible(false)}
                    >
                      <Text style={styles.customButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} styles={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Breakfast')}>
            <Text style={selectedFilters.mealType === 'Breakfast' ? styles.selectedFilter : styles.filterOption}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Lunch')}>
            <Text style={selectedFilters.mealType === 'Lunch' ? styles.selectedFilter : styles.filterOption}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Dinner')}>
            <Text style={selectedFilters.mealType === 'Dinner' ? styles.selectedFilter : styles.filterOption}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Italian')}>
            <Text style={selectedFilters.mealType === 'Italian' ? styles.selectedFilter : styles.filterOption}>Italian</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Indian')}>
            <Text style={selectedFilters.mealType === 'Indian' ? styles.selectedFilter : styles.filterOption}>Indian</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Dessert')}>
            <Text style={selectedFilters.mealType === 'Dessert' ? styles.selectedFilter : styles.filterOption}>Dessert</Text>
        </TouchableOpacity>
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
    </View>
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
   },
   searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',  
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
   },
   filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
   filterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
   },
   filterButtonRound: {
    backgroundColor: '#eee',
    borderRadius: 20,
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