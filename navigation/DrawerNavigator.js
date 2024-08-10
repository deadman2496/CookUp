// navigation/DrawerNavigator.js
import React from 'react';
import { Alert, Button } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileStack from './ProfileStack';  // Assuming you have a separate stack for profiles
import SettingsStack from './SettingsStack';  // Assuming you have a separate stack for settings

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
        drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <Button
                  title="Logout"
                  onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', onPress: () => console.log('Logging out...') }
                  ])}
                />
              </DrawerContentScrollView>
            );
        }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />


    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

