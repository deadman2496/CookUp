// SignUpStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';


import WelcomeScreen from '../(auth)/sign-up/StepZero';
import StepOne from '../(auth)/sign-up/StepOne';
import StepTwo from '../(auth)/sign-up/StepTwo';
import StepThree from '../(auth)/sign-up/StepThree';
import StepFour from '../(auth)/sign-up/StepFour';

const Stack = createStackNavigator();

const SignUpStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Customize sliding animation
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StepOne" component={StepOne} options={{ headerShown: false }} />
      <Stack.Screen name="StepTwo" component={StepTwo} options={{ headerShown: false }} />
      <Stack.Screen name="StepThree" component={StepThree} options={{ headerShown: false }} />
      <Stack.Screen name="StepFour" component={StepFour} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SignUpStack;
