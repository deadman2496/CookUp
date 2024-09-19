import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SmallRecipeCard from './SmallRecipeCard';

const ProfileRecipes = ({ recipes, title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={recipes}
      renderItem={({ item }) => <SmallRecipeCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.recipeList}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeList: {
    justifyContent: 'space-between',
  },
});

export default ProfileRecipes;
