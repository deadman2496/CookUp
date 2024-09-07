import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../(auth)/sign-in";
import SignUpStack from "./SignUpStack"; 
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = ({ isFirstTime }) => (
  <Stack.Navigator initialRouteName={isFirstTime ? 'SignUp' : 'SignIn'}>
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpStack} options={{ headerShown: false }} /> 
    <Stack.Screen name="Onboard" component={Onboarding} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
  </Stack.Navigator>
);

export default AuthNavigator;