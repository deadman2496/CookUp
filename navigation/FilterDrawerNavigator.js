import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FilterScreen from '../screens/FilterScreen'; // Your filter screen


const Drawer = createDrawerNavigator();

const FilterDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Filters" component={FilterScreen} />
    </Drawer.Navigator>
  );
};

export default FilterDrawerNavigator;
