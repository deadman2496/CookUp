// screens/SearchScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { recipes } from '../constants/recipeData';
 // make sure you have this data to filter on


 const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
 const ratings = [1, 2, 3, 4, 5];

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([{
      mealType: '',
      cuisine: '',
      dietaryPreferences: '',
  }]);
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [category, setCategory] = useState('All');
  const [rating, setRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // useEffect(() => {
  //   setFilteredRecipes(shuffleArray(recipes));
  // }, []);

  // const openFilterDrawer = () => {
  //   navigation.openDrawer();
  //  };

  //  const shuffleArray = (array) => {
  //    return array.sort(() => Math.random() - 0.5);
  //   };

  const toggleCategory = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index >= 0) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleRating = (rating) => {
    const index = selectedRatings.indexOf(rating);
    if (index >= 0) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };



  const applyFilters = () => {
    let filtered = recipes;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(r => selectedCategories.includes(r.category));
    }
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(r => selectedRatings.includes(r.rating));
    }
    setFilteredRecipes(filtered);
   };

   const handleSearch = () => {
    let filtered = recipes.filter((recipe) => {
        const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMealType = selectedFilters.mealType ? recipe.mealType === selectedFilters.mealType : true;
        const matchesCuisine = selectedFilters.cuisine ? recipe.cuisine === selectedFilters.cuisine : true;
        const matchesDietaryPreferences = selectedFilters.dietaryPreferences
            ? recipe.dietaryPreferences.includes(selectedFilters.dietaryPreferences)
            : true;
        return matchesSearchQuery && matchesMealType && matchesCuisine && matchesDietaryPreferences;
    });
    setFilteredRecipes(filtered);
};

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
   };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
        <Button title="Filter" onPress={() => navigation.openDrawer()} />

      <Text>Category:</Text>
      <View style={styles.filterContainer}>
                <Text>Meal Type:</Text>
                <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Breakfast')}>
                    <Text style={selectedFilters.mealType === 'Breakfast' ? styles.selectedFilter : styles.filterOption}>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterChange('mealType', 'Dinner')}>
                    <Text style={selectedFilters.mealType === 'Dinner' ? styles.selectedFilter : styles.filterOption}>Dinner</Text>
                </TouchableOpacity>

                {/* Additional filters for cuisine, dietary preferences, etc. */}
            </View>

            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Text style={styles.recipeTitle}>{item.title}</Text>
                        <Text>Cuisine: {item.cuisine}</Text>
                        <Text>Meal Type: {item.mealType}</Text>
                        <Text>Dietary Preferences: {item.dietaryPreferences.join(', ') || 'None'}</Text>
                    </View>
                )}
                />


      <Text>Minimum Rating:</Text>
      <View style={styles.filterContainer}>
        {ratings.map(rating => (
          <TouchableOpacity
            key={rating}
            style={[styles.button, selectedRatings.includes(rating) ? styles.buttonSelected : null]}
            onPress={() => toggleRating(rating)}
          >
            <Text style={styles.buttonText}>{rating}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Apply Filters" onPress={applyFilters} />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No results found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBar: {
    fontSize: 18,
    marginright: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterOption: {
    color: '#007bff',
   },
   selectedFilter: {
    color: '#007bff',
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonSelected: {
    backgroundColor: '#007bff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});

export default SearchScreen;

