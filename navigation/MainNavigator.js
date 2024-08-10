// MainNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import FilterDrawerNavigator from './FilterDrawerNavigator';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabs" component={TabNavigator} />
      <Drawer.Screen name="Filters" component={FilterDrawerNavigator}  />
    </Drawer.Navigator>
  );
}

