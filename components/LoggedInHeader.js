import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, isMenu, isBack }) => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    if (isMenu) {
      navigation.openDrawer();  // Open the drawer
    } else if (isBack) {
      navigation.goBack();  // Navigate back to the previous page
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.iconContainer}>
        {isMenu ? (
          <Icon name="menu" size={24} color="#000" />  // Hamburger menu icon
        ) : (
          isBack && <Icon name="chevron-left" size={24} color="#000" />  // Back chevron icon
        )}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;
