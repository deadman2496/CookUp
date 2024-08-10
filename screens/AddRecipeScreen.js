// In screens/AddRecipeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddRecipeScreen = () => {
  const [title, setTitle] = useState('');

  const handleAddRecipe = () => {
    // Logic to add the recipe
    console.log('Recipe added:', title);
  };

  return (
    <View>
      <TextInput
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Recipe" onPress={handleAddRecipe} />
    </View>
  );
};

export default AddRecipeScreen;
