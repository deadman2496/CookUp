import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import UnitConverter from '../constants/conversionTable';
import { Ionicons } from '@expo/vector-icons';
import {getGroceryItems, addGroceryItem } from '../lib/appwrite';
import CustomCheckbox from '../components/CustomCheckBox';
import SmallRecipeCard from '../components/SmallRecipeCard';

const GroceryListScreen = () => {
        const [amount, setAmount] = useState(0);
        const [fromUnit, setFromUnit] = useState('teaspoon');
        const [toUnit, setToUnit] = useState('tablespoon');
        const [convertedAmount, setConvertedAmount] = useState(null);
        const [modalVisible, setModalVisible ] = useState(false);
        //const [groceryList, setGroceryList] = useState([]);
        const [checkedItems, setCheckedItems] = useState([]);
        //const [itemsToCondense, setItemsToCondense] = useState(2);
        //const [bulkRecipes, setBulkRecipes] = useState([]);

        // Hardcoded grocery list items
  const [groceryList, setGroceryList] = useState([
    { id: 1, name: 'Gluten Free Flour', recipe: 'Gluten Free Protein Pizza', quantity: '2', unit: 'cups' },
    { id: 2, name: 'Baking Powder', recipe: 'Gluten Free Protein Pizza', quantity: '1', unit: 'tsp' },
    { id: 3, name: 'Olive Oil', recipe: 'Gluten Free Protein Pizza', quantity: '1', unit: 'tbsp' },
    { id: 4, name: 'Chicken Wings', recipe: 'Homemade Fresh Chicken Broth', quantity: '6', unit: 'pieces' },
    { id: 5, name: 'Garlic', recipe: 'Homemade Fresh Chicken Broth', quantity: '10', unit: 'cloves' },
  ]);

  // Hardcoded bulk recipes
  const [bulkRecipes, setBulkRecipes] = useState([
    { id: 1, title: 'Gluten Free Protein Pizza', author: 'by cassandrapde' },
    { id: 2, title: 'Homemade Fresh Chicken Broth', author: 'by lively_lover' },
  ]);
      


        const handleConvert = () => {
          const result = convertUnits(amount, fromUnit, toUnit);
          if (result) {
            setConvertedAmount(result.toFixed(2));
          } else {
            setConvertedAmount('Conversion not possible');
          }
        };

        useEffect(() => {
          const fetchGroceryItems = async () => {
          const items = await getGroceryItems();
          setGroceryList(items);
        };

        fetchGroceryItems();
        }, []);

        const toggleCheckbox = (itemId) => {
          setCheckedItems((prevState) =>
            prevState.includes(itemId) ? prevState.filter((id) => id !== itemId) : [...prevState, itemId]
          );
        };

        const condenseGroceryList = () => {
          const condensed = condenseList(groceryList);
          setGroceryList(condensed);
        };
        

      
        return (
          <SafeAreaView style={styles.container}>
             {/* Add new ingredient button */}
             <TouchableOpacity style={styles.addIngredientButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addIngredientText}>add new ingredient</Text>
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
        <Text style={styles.condenseButtonText}>2 items to consolidate</Text>
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
              item={item} // Pass the recipe item directly to SmallRecipeCard
              onPress={() => {
                () => navigation.navigate("RecipeDetails", { recipe: item.$id },)
              }}
            />
          )}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
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

            
            <View>
            <FlatList 
              data={groceryList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View>
                  <Text style={styles.IngredientLabel}>{item.name}</Text>
                  <Text style={styles.recipeLabel}>({item.recipe})</Text>
                </View>
              )}
            />
            <Button title="Condense Grocery List" onPress={condenseGroceryList} />
            </View>
            <Button title='Convert Units' onPress={() => setModalVisible(true)}/>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <UnitConverter />
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
  recipeCard: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipeAuthor: {
    fontSize: 12,
    color: '#888',
  },
  editButton: {
    marginTop: 15,
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#f57c00',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default GroceryListScreen;
