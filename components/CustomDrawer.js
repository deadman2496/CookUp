import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { images } from '../constants';
import * as Font from 'expo-font'; 
import { useNavigation } from '@react-navigation/native';
import { checkAuth, signOutUser } from '../utils/auth';
import TabNavigator from '../navigation/TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import YourMenusPage from '../screens/YourMenusScreen';
import DietaryRestrictionsPage from '../screens/DietaryRestrictionsScreen';



const CustomDrawerContent = (props) => {
    const navigation = useNavigation();

    const handleLogout = async () => {
      try {
        await signOutUser();
        setIsAuthenticated(false);
        alert('Logged out Successfully');
        navigation.replace('SignIn');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    const [fontsLoaded] = Font.useFonts({
        'Shrikhand-Regular': require('../assets/fonts/Shrikhand-Regular.ttf'),
    });
  return (
    <View style={{ flex: 1, backgroundColor: '#D14E36',  }}>
        <SafeAreaView style={styles.safeArea}>
      {/* Top Section with Cookup Title and User Greeting */}
      {/* Top Section with Cookup Title as a Touchable */}
      <TouchableOpacity onPress={() => navigation.navigate('CookUp')}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily: 'Shrikhand-Regular'}]}>Cookup</Text>
          <Text style={styles.greeting}>Hi, Cassandra</Text>
        </View>
      </TouchableOpacity>

      {/* Drawer Menu Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        {/* <DrawerItemList {...props} /> */}
        {/* Custom Drawer Items */}
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user-circle" size={20} color="#fff" />
          <Text style={styles.drawerLabel}>Your Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color="#fff" />
          <Text style={styles.drawerLabel}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Your Menus')}>
          <Icon name="utensils" size={20} color="#fff" />
          <Text style={styles.drawerLabel}>Your Menus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Dietary Restrictions')}>
          <Icon name="exclamation-triangle" size={20} color="#fff" />
          <Text style={styles.drawerLabel}>Dietary Restrictions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => alert(handleLogout)}>
          <Icon name="sign-out-alt" size={20} color="#fff" />
          <Text style={styles.drawerLabel}>Log Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* Bottom Background Image */}
      <ImageBackground
        source={require('../assets/images/drawer_background.png')} // Add your custom image here
        style={styles.imageBackground}
      />
      </SafeAreaView>
      </View>
    
  );
};

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
      },
  header: {
    padding: 20,
    backgroundColor: '#D14E36',  // The background color for the header section
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  drawerContent: {
    backgroundColor: '#D14E36',  // The background color for the drawer content
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'sans-serif',  // Adjust the font to match Figma
  },
  imageBackground: {
    width: 500,
    height: 375,  // Adjust this height based on how much of the drawer should be covered by the image
    position: 'absolute',
    bottom: 0,
    left: -215,
  },
});

export default CustomDrawerContent;
