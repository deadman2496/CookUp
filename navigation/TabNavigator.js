// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import HomeScreen from '../screens/HomeScreen';
import SettingsStack from './SettingsStack';
import SearchScreen from '../screens/SearchScreen';
import RecipeBoxScreen from '../screens/RecipeBoxScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import GroceryListScreen from '../screens/GroceryListScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Recipe Box') {
                iconName = 'book-outline';
            } else if (route.name === 'New Recipe') {
                iconName = 'add-circle-outline';
            } else if (route.name === 'Grocery List') {
                iconName = 'basket-outline';
            } else if (route.name === 'Home') {
                iconName = 'home-outline';
            } else if (route.name === 'Search') {
                iconName = 'search-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: 'gray',
    })}
>
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Recipe Box" component={SearchScreen} />
      <Tab.Screen name="New Recipe" component={NewRecipeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Grocery List" component={GroceryListScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
