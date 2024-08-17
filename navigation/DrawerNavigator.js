// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import YourMenusPage from '../screens/YourMenusScreen';
import DietaryRestrictionsPage from '../screens/DietaryRestrictionsScreen';
import { Button, View, Text, Alert } from 'react-native';
import TabNavigator from './TabNavigator';
import ProfileStack from './ProfileStack';  // Assuming you have a separate stack for profiles
import SettingsStack from './SettingsStack';  // Assuming you have a separate stack for settings

const Drawer = createDrawerNavigator();

const Logout = ({navigation}) => {
  const handleLogout = () => {
    // TODO: Logout logic here
    alert('Logged out Successfully');
    // TODO: Redirect to login screen
    navigation.replace('Login');
   };

   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
};

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProfilePage">
        <Drawer.Screen name="Your Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Your Menus" component={YourMenusPage} />
        <Drawer.Screen name="Dietary Restrictions" component={DietaryRestrictionsPage} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;

