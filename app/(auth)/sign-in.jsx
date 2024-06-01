import { View, Text, ScrollView, Image, Alert, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';

import { getCurrentUser, signIn } from '../../lib/appwrite';

import dinner from "../../assets/images/dinner.png";

const  SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if( form.email === "" || form.password === ""){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      //set it to global state...

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{
          height: "100%",}}>
        <ImageBackground source={dinner} style={styles.container}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.cookUp} 
            resizeMode='contain'
            className="w-[350px] h-[90px]"
          />

          <Text className="text-3xl text-white text-semibold mt-10 font-psemibold">Welcome Back</Text>
          <FormField 
            placeholder="Email"
            value= {form.email}
            handleChangeText={(e)=> setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            placeholder="Password"
            value= {form.password}
            handleChangeText={(e)=> setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton 
            title="Sign-in"
            handlePress={submit}
            containerStyles="mt-8 mb-12"
            isLoading={isSubmitting}
          />
          <View className="bg-white opacity-50 justify-center mt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Not yet a member?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-System-400">
              Sign Up
            </Link>
            <Text className="text-lg text-gray-100 font-pregular">!</Text>
          </View>
        </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default  SignIn

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      height:'100px',
      width: '400px',
      resizeMode:'cover',
  },
});