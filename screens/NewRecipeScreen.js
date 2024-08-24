import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Modal, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { mealTypes, cuisines, dietaryPreferences } from '../utils/filters';

const NewRecipeScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingSize, setServingSize] = useState(1);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit : '' }]);
  const [selectedFilters, setSelectedFilters] = useState({ mealType: [], cuisine: [], dietaryPreferences: [] });
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      if (!title || !description || !servingSize || !ingredients.some(i => !i.name || !i.quantity || !i.unit)) {
        Alert.alert('Error','Please fill out all fields');
        return;
      }
      const newRecipe = {
        title,
        description,
        servingSize,
        ingredients,
        filters: selectedFilters,
        images,
      };
      console.log(newRecipe);
      Alert.alert('Success','Recipe added successfully!');
    }

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
          <TouchableOpacity
            key={mealType}
            style={[
              styles.filterButton,
              selectedFilters.mealType.includes(mealType) && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter('mealType', mealType)}
          >
            <Text>{mealType}</Text>
          </TouchableOpacity>

        ))}
      </View>
      <Text styles={styles.filterCategory}>Cuisines</Text>
      <View style={styles.filterContainer}>
        {cuisines.map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.filterButton,
              selectedFilters.cuisine.includes(cuisine) && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter('cuisine', cuisine )}
          >
            <Text>{cuisine}</Text>
          </TouchableOpacity>

        ))}
      </View>
      <Text styles={styles.filterCategory}>DietaryPreferences</Text>
      <View style={styles.filterContainer}>
        {dietaryPreferences.map((preference) => (
          <TouchableOpacity
            key={preference}
            style={[
              styles.filterButton,
              selectedFilters.dietaryPreferences.includes(preference) && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter('dietaryPreferences', preference )}
          >
            <Text>{preference}</Text>
          </TouchableOpacity>

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

      <Button title="Submit Recipe" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default NewRecipeScreen;

const styles = StyleSheet.create({
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
   image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
   },
 });
