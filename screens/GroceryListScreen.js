import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import UnitConverter from '../constants/conversionTable';
import { Ionicons } from '@expo/vector-icons';
import { getGroceryItems, addGroceryItem } from '../lib/appwrite'; // For backend data
import CustomCheckbox from '../components/CustomCheckBox';
import SmallRecipeCard from '../components/SmallRecipeCard';
import Header from '../components/LoggedInHeader';

const DEBUG_MODE = true; // Toggle to switch between hardcoded and backend data

const GroceryListScreen = () => {
  const [amount, setAmount] = useState(0);
  const [fromUnit, setFromUnit] = useState('teaspoon');
  const [toUnit, setToUnit] = useState('tablespoon');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  // Hardcoded grocery list items
  const hardcodedGroceryList = [
    { id: 1, name: 'Gluten Free Flour', recipe: 'Gluten Free Protein Pizza', quantity: '2', unit: 'cups' },
    { id: 2, name: 'Baking Powder', recipe: 'Gluten Free Protein Pizza', quantity: '1', unit: 'tsp' },
    { id: 3, name: 'Olive Oil', recipe: 'Gluten Free Protein Pizza', quantity: '1', unit: 'tbsp' },
    { id: 4, name: 'Chicken Wings', recipe: 'Homemade Fresh Chicken Broth', quantity: '6', unit: 'pieces' },
    { id: 5, name: 'Garlic', recipe: 'Homemade Fresh Chicken Broth', quantity: '10', unit: 'cloves' },
  ];

  // Hardcoded bulk recipes
  const hardcodedBulkRecipes = [
    { id: 1, title: 'Gluten Free Protein Pizza', author: 'by cassandrapde' },
    { id: 2, title: 'Homemade Fresh Chicken Broth', author: 'by lively_lover' },
  ];

  // State for grocery list and bulk recipes
  const [groceryList, setGroceryList] = useState([]);
  const [bulkRecipes, setBulkRecipes] = useState([]);

  // Fetch from backend or use hardcoded data based on DEBUG_MODE
  useEffect(() => {
    const loadGroceryList = async () => {
      if (DEBUG_MODE) {
        // Use hardcoded data in debug mode
        setGroceryList(hardcodedGroceryList);
        setBulkRecipes(hardcodedBulkRecipes);
      } else {
        // Fetch grocery list from backend
        try {
          const backendGroceryList = await getGroceryItems();
          setGroceryList(backendGroceryList);
        } catch (error) {
          console.error('Error fetching grocery list from backend:', error);
        }
      }
    };

    loadGroceryList();
  }, []);

  const toggleCheckbox = (itemId) => {
    setCheckedItems((prevState) =>
      prevState.includes(itemId) ? prevState.filter((id) => id !== itemId) : [...prevState, itemId]
    );
  };

  const condenseGroceryList = () => {
    const condensed = condenseList(groceryList); // Assume condenseList function exists
    setGroceryList(condensed);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <Header title="Your Grocery List" isMenu={true} />
      
      {/* Add new ingredient button */}
      <TouchableOpacity style={styles.addIngredientButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addIngredientText}>Add new ingredient</Text>
      </TouchableOpacity>
      
      {/* Grocery List */}
      <FlatList
        data={groceryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientRow}>
            <CustomCheckbox
              isChecked={checkedItems.includes(item.id)}
              onPress={() => toggleCheckbox(item.id)}
              label={item.name}
            />
            <View style={styles.ingredientTextContainer}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.recipeName}>({item.recipe})</Text>
            </View>
            <Text style={styles.ingredientQuantity}>{item.quantity} {item.unit}</Text>
          </View>
        )}
      />

      {/* Condense Items Button */}
      <TouchableOpacity style={styles.condenseButton} onPress={condenseGroceryList}>
        <Text style={styles.condenseButtonText}>Condense Items</Text>
      </TouchableOpacity>

      {/* Bulk Recipes Section */}
      <View style={styles.bulkContainer}>
        <Text style={styles.bulkTitle}>Bulk Up</Text>
        <FlatList
          data={bulkRecipes}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SmallRecipeCard
              item={item}
              onPress={() => navigation.navigate('RecipeDetails', { recipe: item.id || item.$id })}
            />
          )}
        />
      </View>

      {/* Modal for Adding Ingredient */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text>Add a new ingredient here!</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  addIngredientButton: {
    backgroundColor: '#87A14B',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addIngredientText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  ingredientTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeName: {
    fontSize: 12,
    color: '#888',
  },
  ingredientQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  condenseButton: {
    backgroundColor: '#87A14B',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  condenseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bulkContainer: {
    marginTop: 20,
  },
  bulkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default GroceryListScreen;
