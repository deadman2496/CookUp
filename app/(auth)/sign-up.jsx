import { View, Text, ScrollView, Image, Alert, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router , Stack } from 'expo-router';

import {createUser} from '../../lib/appwrite';

const onboardingSteps = [
  {
      title: "Sign up",
      description: "Getting to know a little more about you to get the best personalization possible",
      field: `
    <FormField 
      placeholder="First Name"
      value= {form.username}
      handleChangeText={(e)=> setForm({...form, email: e})}
      otherStyles="mt-7"
      keyboardType="email-address"
    />
    <FormField 
      placeholder="Last Name"
      value= {form.username}
      handleChangeText={(e)=> setForm({...form, password: e})}
      otherStyles="mt-7"
    />`
  },
  {
      title: "Let's get your phone number",
      description: "",
      field:`<FormField 
      placeholder="phone number"
      value= {form.username}
      handleChangeText={(e)=> setForm({...form, password: e})}
      otherStyles="mt-7"
    />`
  },
  {
      title: "Choose a Username",
      description: "Choose a combination of numbers and letters to display on your profile",
      field:`<FormField 
      placeholder="Create a username"
      value= {form.username}
      handleChangeText={(e)=> setForm({...form, password: e})}
      otherStyles="mt-7"
    />`
  },
  {
      title: "Enter your email and password",
      description: "Choose a combination of numbers letters and capitalization.",
      field: `<FormField 
      placeholder="email"
      value= {form.email}
      handleChangeText={(e)=> setForm({...form, email: e})}
      otherStyles="mt-10"
    />
    <FormField 
      placeholder="password"
      value= {form.password}
      handleChangeText={(e)=> setForm({...form, password: e})}
      otherStyles="mt-10"
    />`
  },
];

  
const  signUp  = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
      const isLastScreen = screenIndex === onboardingSteps.length - 1
      if (isLastScreen) {
          setScreenIndex(0);
      } else
      setScreenIndex(screenIndex + 1);
  };
  const onReturn = () => {
      setScreenIndex(screenIndex - 1);
  };
  const endOnboarding = () => {
      setScreenIndex(0);
      router.back();
  };
  

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(form.username === "" || form.email === "" || form.password === ""){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setStatusBarNetworkActivityIndicatorVisible(result);
      setIsLogged(true);
      //set it to global state...

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <Stack.Screen options={{headerShown: false}} />
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">{data.title}</Text>
          <Text className="text-md text-primary-200 mt-10 font-pmedium">{data.description}</Text>
          <FormField 
            title="Username"
            value= {form.username}
            handleChangeText={(e)=> setForm({...form, username: e})}
            otherStyles="mt-10"
          />
          <FormField 
            title="Email"
            value= {form.email}
            handleChangeText={(e)=> setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value= {form.password}
            handleChangeText={(e)=> setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton 
            title="Sign-up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View style={styles.buttonRow}>
            <Text onPress={onReturn} style={styles.buttonText}>Back</Text>
              <Pressable onPress={onContinue} style={styles.button}>
                <Text style={styles.buttonText}>
                  Continue
                </Text>
              </Pressable>
          </View>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Already Joined us? Then
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-System-400">
              Sign in
            </Link>
            <Text className="text-lg text-black-100 font-pregular">!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default  signUp 

const styles = StyleSheet.create({
  page: {
      //alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
  },
  image: {},
  title: {
      color: '#323232',
      fontSize: 50,
      fontWeight: '500',
      fontFamily: 'Poppins',
      letterSpacing: 1.5
  },
  description: {
      color: 'gray',
      fontSize: 25,
  },
  buttonRow: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems:'center',
      gap: 20,
  },
  button: {
      backgroundColor: '#302E38',
      padding: 18,
      borderRadius: 70,
      alignItems: 'center',
      flex: 1,
  },
  buttonText: {
      
      color: '#fdfdfd',
      fontFamily:'Poppins',
      fontSize: 17,

      padding: 15,
  },
})