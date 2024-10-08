import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Modal, FlatList, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { mealTypes, cuisines, dietaryPreferences } from '../utils/filters';
import { useRecipes } from '../contexts/RecipeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNewRecipe } from '../lib/appwrite';
import FilterTag from '../components/FilterTags';

const NewRecipeScreen = ({navigation}) => {
  //const { addNewRecipe } = useRecipes(); // Access to addNewRecipe from RecipeContext
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingSize, setServingSize] = useState(1);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit : '' }]);
  const [selectedFilters, setSelectedFilters] = useState({ mealType: [], cuisine: [], dietaryPreferences: [] });
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const validateFields = () => {
    const errors= [];

    if(!title.trim()) errors.push('Title is required');
    if(!description.trim()) errors.push('Description is required');
    if(!servingSize || servingSize < 1) errors.push('Serving size must be greater than 0');

    const incompleteIngredients = ingredients.some(i => !i.name.trim() || !i.quantity.trim() || !i.unit.trim());
    if (incompleteIngredients) errors.push('Ingredients must have name, quantity, and unit');

    if (!selectedFilters.mealType) errors.push('Meal Type is required');
    if (!selectedFilters.cuisine) errors.push('Cuisine is required');
    if (!selectedFilters.dietaryPreferences) errors.push('Dietary Preferences is required');  
    if (images.length < 1) errors.push('At least one image is required');

    return errors;
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit : '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value} : ingredient
     );
     setIngredients(updatedIngredients);
   };

   const incrementServingSize = () => {
     setServingSize(prevSize => prevSize + 1);
   };

   const decrementServingSize = () => {
      if (servingSize > 1) {
        setServingSize(prevSize => prevSize - 1);
      }
   };

   const handleServingSizeChange = (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setServingSize(parsedValue);
    } else {
      setServingSize(1);
    }
   };

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
       });

       if (!result.canceled) {
         setImages([ ...images, result.assets[0].uri]);
       }
    };

    const toggleFilter = (filterType, value) => {
      setSelectedFilters((prevFilters) => {
        const filterList = prevFilters[filterType];
        if (filterList.includes(value)) {
          return {
            ...prevFilters,
            [filterType]: filterList.filter((item) => item !== value),
          };
         } else { 
          return {
            ...prevFilters,
            [filterType]: [...filterList, value],
          };
         }
       });
    };

    const handleSubmit =() => {

      const errors = validateFields();
      if (errors.length > 0) {
        setErrorMessages(errors);
        return;
      }

      const combinedIngredients = ingredients.map(ingredient =>
        `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
      );
      
      const newRecipe = {
        title,
        description,
        servingSize,
        ingredients: combinedIngredients,
        filters: selectedFilters,
        images,
      };

      try {
        addNewRecipe(newRecipe); // adds new recipe to Appwrite/database
      Alert.alert('Success', 'Recipe added successfully!');
      console.log(newRecipe);
      navigation.navigate('Home'); //if successful, navigates to Home screen  
      } catch (error) {
        Alert.alert('Error', 'Failed to add recipe. Please try again.');
      }
      
    };

    const renderImageGrid = () => {
      <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Flatlist 
            data={images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item}) => (
              <Image source={{ uri: item }} style={styles.gridImage} />
            )}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    }
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Name your Recipe"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your Recipe"
        value={description}
        onChangeText={setDescription} 
      />

      {/* Serving Size Section */}
      <Text style={styles.label}>Serving Size</Text>
      <View style={styles.servingSizeContainer}>
        <TouchableOpacity
          onPress={decrementServingSize}
          style={styles.iconButton}
        >
          <Ionicons name="remove-circle-outline" size={32} color='black' />
        </TouchableOpacity>
      
      <TextInput
        style={styles.servingSizeInput}
        value={servingSize.toString()}
        onChangeText={handleServingSizeChange}
        keyboardType='numeric' 
      />
      <TouchableOpacity
        onPress={incrementServingSize}
        style={styles.iconButton}
      >
        <Ionicons name="add-circle-outline" size={32} color="black" />
      </TouchableOpacity>
      </View>

      {/* Ingredients Section */}
      <Text style={styles.label}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            style={styles.quantityInput}
            placeholder="Quantity"
            value={ingredient.quantity}
            onChangeText={(text) => handleIngredientChange(index, 'quantity', text)}
            keyboardType='numeric'
          />
          <TextInput 
            style={styles.unitInput}
            placeholder="Unit"
            value={ingredient.unit}
            onChangeText={(text) => handleIngredientChange(index, 'unit', text)}
          />
          <TextInput
            style={styles.ingredientInput}
            placeholder="Ingredient"
            value={ingredient.name}
            onChangeText={(text) => handleIngredientChange(index, 'name', text)} 
          />
        </View>
      ))}
      <Button title="Add Ingredient" onPress={addIngredient} />
       {/* filters tabs */}
      <View>
      <Text styles={styles.filterCategory}>Meal Types</Text>
      <View style={styles.filterContainer}>
        {mealTypes.map((mealType) => (
          <FilterTag 
            key={mealType}
            label={mealType}
            selected={selectedFilters.mealType.includes(mealType)}
            onPress={() => toggleFilter('mealType', mealType)}
            type = "mealType"
          />
        ))}
      </View>
      <Text styles={styles.filterCategory}>Cuisines</Text>
      <View style={styles.filterContainer}>
        {cuisines.map((cuisine) => (
          <FilterTag 
          key={cuisine}
          label={cuisine}
          selected={selectedFilters.cuisine.includes(cuisine)}
          onPress={() => toggleFilter('cuisine', cuisine)}
          type = "cuisine"
        />
        ))}
      </View>
      <Text styles={styles.filterCategory}>DietaryPreferences</Text>
      <View style={styles.filterContainer}>
        {dietaryPreferences.map((preference) => (
          <FilterTag 
          key={preference}
          label={preference}
          selected={selectedFilters.dietaryPreferences.includes(preference)}
          onPress={() => toggleFilter('dietaryPreferences', preference)}
          type = "dietaryPreferences"
        />
        ))}
      </View>
      </View>

      {/* Images section */}
      <Text style={styles.label}>Upload your Photos</Text>
      <View style={styles.imageRow}>
        
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
          {images.slice(0, 2).map((imageUri, index) => (
              <Image key={index} source={{ uri: imageUri }} style={styles.previewImage} />
          ))}

          { images.length > 2 && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
            >
              {/* <Image source={{ uri: images[2] }} style={styles.previewImage} />
              <Text style={styles.moreImagesText}>+{images.length - 2}</Text> */}
              <Ionicons name='grid-outline' size={50} color='black' />
            </TouchableOpacity>
          )}
      </View>

      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />} */}

      {errorMessages.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Please fill out the following fields:
          </Text>
          {errorMessages.map((message, index) => (
            <Text key={index} style={styles.errorMessage}>
              {message}
            </Text>
          ))}
        </View>
      )}

      <Button title="Submit Recipe" onPress={handleSubmit} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default NewRecipeScreen;

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label:{
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
   },
   servingSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
   },
   iconButton: {
    padding: 5,
   },
   servingSizeInput: {
    width: 50,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 10,
   },
   imageRow :{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
   },
   imagePicker: { 
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
   },
   previewImage : {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
   },
   moreImagesText: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 2,
   },
   ingredientRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
   },
   ingredientInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
   },
   quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
   },
   unitInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
   },
   imagePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dottedBox: {
      width: 100,
      height: 100,
      borderWidth: 2,
      borderColor: '#ccc',
      borderStyle: 'dotted',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
     },
     sampleImagesContainer: {
      flexDirection: 'row',
     },
     sampleImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
     },
     modalContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
     },
     gridImage: {
      width: '30%',
      height: 100,
      margin: 5,
     },
   filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
   },
   filterButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
   },
   selectedFilterButton: {
    backgroundColor: '#FF6347',
   },
   filterCategory: {
    fontSize: 16,
    marginVertical: 10,
   },
   image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
   },
   errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
   },
   errorTitle: {
    color: '#d9534f',
    fontWeight: 'bold',
    marginBottom: 5,
   },
    errorMessage: {
      color: '#d9534f',
    },
 });
