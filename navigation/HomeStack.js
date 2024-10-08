import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ReviewPage from '../screens/ReviewPage';
import AddReviewPage from '../screens/AddReviewPage';
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
      <Stack.Screen 
        name="ReviewPage"
        component={ReviewPage}
        options={{ title: 'Reviews' }}
      />
      <Stack.Screen
        name="AddReviewPage"
        component={AddReviewPage}
        options={{ title: 'Add Review' }}
      />
    </Stack.Navigator>

  );
};

export default HomeStack;
