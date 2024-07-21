import { View, Text, ScrollView, Image, Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressSteps, ProgressStep} from 'react-native-progress-steps';

import { images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router , Stack } from 'expo-router';
import { useGlobalContext} from '../../context/GlobalProvider';
import {createUser} from '../../lib/appwrite';
import Signup from '../../components/sign-up-name';
import PersonalDetails from '../../components/sign-up-number';
import Extra from '../../components/sign-up-username';
import Last from '../../components/sign-up-email';

  
const  signUp  = () => {

  const {setUser, setIsLogged} = useGlobalContext();
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(step1data.firstName === "" || step1data.lastName === "" || step2data.pNumber === ""||step3data.username === "" || step4data.email === "" || step4data.password === "" || step4data.confirmpassword === ""){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    if (step4data.password !== step4data.confirmpassword) {
      Alert.alert('Error', 'Please make sure password and confirm password are the same')
    }


    setIsSubmitting(true);
    try {
      const result = await createUser(step1data.email, step2data.password, step3data.username, step2data.phoneNum, step4data.firstName, step4data.lastName);
      setUser(result);
      setIsLogged(true);
      //set it to global state...

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }


const [step4data, setStep4Data] = useState({firstName: "", lastName: ""})
const [step2data, setStep2Data] = useState({phoneNum: ""})
const [step3data, setStep3Data] = useState({username: ""})
const [step1data, setStep1Data] = useState({email: "", password: "", confirmpassword: ""})

onNextStep = () => {
  console.log('called next step');
};

onPrevStep=() => {
  console.log('called previous step');
};

onSubmitSteps = async () => {
  console.log('called on submit step.');
  console.log(step1data,step2data,step3data,step4data);
  if(step4data.firstName === "" || step4data.lastName === "" || step2data.phoneNum === ""||step3data.username === "" || step1data.email === "" || step1data.password === "" || step1data.confirmpassword === ""){
    Alert.alert('Error', 'Please fill in all the fields')
  }
  if (step4data.password !== step4data.confirmpassword) {
    Alert.alert('Error', 'Please make sure password and confirm password are the same')
  }


  setIsSubmitting(true);
  try {
    const result = await createUser(step1data.email, step1data.password, step4data.firstName, step4data.lastName, step2data.phoneNum, step3data.username,);
    setUser(result);
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
      <View className="flex-1 flex px-[20px]">
          <ProgressSteps>
            <ProgressStep
              onNext={this.onNextStep}
              onPrevious={this.onPrevStep}
            >
              <View className="items-center">
                <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">Sign up</Text>
                <Text className="text-md text-primary-200 mt-10 font-pmedium"> Getting to know a little more about you to get the best personalization possible</Text>
                <FormField 
                  title=""
                  placeholder="First Name"
                  value={step1data.firstName}
                  handleChangeText={(e) => setStep4Data({...step4data, firstName: e})}
                  otherStyles="mt-10"
                />
                <FormField 
                  title=""
                  placeholder="Last Name"
                  value={step1data.lastName}
                  handleChangeText={(e) => setStep4Data({...step4data, lastName: e})}
                  otherStyles="mt-10"
                />
              </View>

            </ProgressStep>

            <ProgressStep
              onNext={this.onNextStep}
              onPrevious={this.onPrevStep}
            >
              <View className="items-center">
                <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">Let's get your phone number</Text>
                <FormField 
                  title=""
                  placeholder="phone number"
                  value={step2data.pNumber}
                  handleChangeText={(e) => setStep2Data({...step2data, phoneNum: e})}
                  otherStyles="numeric"
                />
              </View>

            </ProgressStep>
            <ProgressStep
              onNext={this.onNextStep}
              onPrevious={this.onPrevStep}
            >
              <View className="items-center">
                <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">Choose a Username</Text>
                <Text className="text-md text-primary-200 mt-10 font-pmedium">Choose a combination of numbers and letters to display on your profile</Text>
                <FormField 
                  title=""
                  placeholder="Create a unique username"
                  value={step3data.username}
                  handleChangeText={(e) => setStep3Data({...step3data, username: e})}
                  otherStyles="mt-10"
                />
              </View>

            </ProgressStep>
            <ProgressStep
              onPrevious={this.onPrevStep}
              onSubmit={this.onSubmitSteps}
            >
              <View className="items-center">
                <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">Enter your email and password</Text>
                <FormField 
                  title=""
                  placeholder="email"
                  value={step4data.email}
                  handleChangeText={(e) => setStep1Data({...step1data, email: e})}
                  otherStyles="mt-10"
                  keyboardType="email-address"
                />
                <FormField 
                  title=""
                  placeholder="Password"
                  value={step4data.password}
                  handleChangeText={(e) => setStep1Data({...step1data, password: e})}
                  otherStyles="mt-7"
                />
                <FormField 
                  title=""
                  placeholder="Password"
                  value={step4data.confirmpassword}
                  handleChangeText={(e) => setStep1Data({...step1data, confirmpassword: e})}
                  otherStyles="mt-7"
                />
                <Text className="text-md text-primary-200 mt-10 font-pmedium">Choose a combination of numbers, letters, and capitalization</Text>
              </View>

            </ProgressStep>
          </ProgressSteps>
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
      </ScrollView>
    </SafeAreaView>
  )
}

       {/* <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl text-primary-200 text-semibold mt-10 font-psemibold">{FormTitle[screen]}</Text>
          <Text className="text-md text-primary-200 mt-10 font-pmedium">{FormDescription[screen]}</Text>
          <View>
            {ScreenDisplay()}
          </View>
          <CustomButton 
            title={steps}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          /> */} //old code
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