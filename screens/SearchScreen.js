// screens/SearchScreen.js
import React, { useState } from 'react';
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
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [category, setCategory] = useState('All');
  const [rating, setRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const openFilterDrawer = () => {
    navigation.openDrawer();
   };

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

  const handleSearch = (text) => {
    setQuery(text);
    if (timeoutId) clearTimeout(timeoutId);  // Clear the previous timeout

    const newTimeoutId = setTimeout(() => {
      if (text.length > 0) {
        const formattedQuery = text.toLowerCase();
        const filteredData = recipes.filter(recipe => {
          return recipe.title.toLowerCase().includes(formattedQuery);
        });
        setFilteredRecipes(filteredData);
      } else {
        setFilteredRecipes([]);
      }
    }, 300);  // Only trigger the search after 300ms of no input

    setTimeoutId(newTimeoutId);
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
        value={query}
        onChangeText={handleSearch}
      />
        <Button title="Filter" onPress={() => navigation.openDrawer()} />

      <Text>Category:</Text>
      <View style={styles.filterContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.button, selectedCategories.includes(category) ? styles.buttonSelected : null]}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
        </View>

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

