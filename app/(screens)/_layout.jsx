import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import RecipeDetail from '../../components/RecipeDetail';
import RecipeDetailScreen from '../(tabs)/RecipeDetailScreen';

const screenLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen 
                name="FilterProducts"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="FilterScreen"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='RecipeDetailScreen'
                options={{
                    headerShown: false
                }}
                component={RecipeDetailScreen}
            />
        </Stack>

        <StatusBar 
            style="dark"
        />
    </>
  )
}

export default screenLayout;