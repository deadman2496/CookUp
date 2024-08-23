// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoriteRecipesProvider } from './contexts/BookmarkContext';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import YourMenusPage from './screens/YourMenusScreen';
import DietaryRestrictionsPage from './screens/DietaryRestrictionsScreen';
import RecipeBoxScreen from './screens/RecipeBoxScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import GroceryListScreen from './screens/GroceryListScreen';
import ReviewPage from './screens/ReviewPage';
//import LoginPage from './screens/LoginPage';
//import SignUpPage from './screens/SignUpPage';
import { Button, View} from 'react-native';
import SearchScreen from './screens/SearchScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) =>{
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
  })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recipe Box" component={RecipeBoxScreen} />
      <Tab.Screen name="New Recipe" component={NewRecipeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Grocery List" component={GroceryListScreen} />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </>
      ) : (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}

const Logout = ({navigation}) => {
  const handleLogout = () => {
    //TODO: Logout logic here
    alert('Logged out Successfully');
    //TODO: Redirect to login screen
    navigation.replace('Login');
   };

   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    );
 };

 function NoDrawerStackNavigator() {
    return ( 
      <Stack.Navigator>
        <Stack.Screen name="Details" component={RecipeDetailScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="ReviewPage" component={ReviewPage} options={{ gestureEnabled: false, headerShown: false }} />
        {/* <Stack.Screen name="LoginPage" component={LoginPage} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ gestureEnabled: false, headerShown: false }} /> */}
        <Stack.Screen name="NewRecipe" component={NewRecipeScreen} options={{ gestureEnabled: false, headerShown: false }} />
      </Stack.Navigator>
    );
  }

 function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Your Menus" component={YourMenusPage} />
      <Drawer.Screen name="Dietary Restrictions" component={DietaryRestrictionsPage} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
   );
 }

export default function App() {
  return (
    <FavoriteRecipesProvider>
    <NavigationContainer>
      <Stack.Navigator>
                {/* Main Drawer Navigator */}
                <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

                {/* Screens Without Drawer Access */}
                <Stack.Screen name="NoDrawerStack" component={NoDrawerStackNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
    </NavigationContainer>
    </FavoriteRecipesProvider>
  );
};