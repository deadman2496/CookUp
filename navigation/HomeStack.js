import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e', // Customize your header style here
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'My Home' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={RecipeDetailScreen} 
        options={{ title: 'Detail View' }}
      />
    </Stack.Navigator>

  );
};

export default HomeStack;
