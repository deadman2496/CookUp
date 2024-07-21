import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import * as ImagePicker from'expo-image-picker';
import { router } from 'expo-router';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';


const newRecipe = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
      if(selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0]})
      }
      if(selectType === 'video') {
        setForm({ ...form, video: result.assets[0]})
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if(!form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true)

    try {
      await createVideo({
        ...form, userId: user.$id
      })

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-black-500 h-full">
      <ScrollView className="px-4 my-6">
      <View className="inline-block w-full">
        <Text className="text-sm text-black font-sregular text-left">cancel</Text>
        <Text className="text-2xl text-black-100 font-psemibold text-center">
          New Recipe
        </Text>
        <Text className="text-sm text-black font-sregular text-right">next</Text>
        </View>
        <FormField 
          title="Recipe Title"
          value={form.title}
          placeholder="Name Your Dish!"
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-10"

        />
        <FormField 
          title="Recipe Description"
          value={form.description}
          placeholder="Provide description for your dish here"
          handleChangeText={(e) => setForm({...form, description: e})}
          otherStyles="mt-10"

        />
        <View
          horizontal
        >
          <CustomButton 
            title="breakfast"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton 
            title="lunch"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="dinner"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="dessert"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="side dish"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="snack"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
        </View>
        <View
          horizontal
        >
          <CustomButton 
            title="American"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton 
            title="Indian"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="Thai"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="Mexican"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <View
          horizontal
        >
          <CustomButton 
            title="Central American"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton 
            title="Italian"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="Greek"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}}
          />
          <CustomButton
            title="Chinese"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="French"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="Japanese"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="Spanish"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />

<CustomButton
            title="Middle Eastern"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="South American"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="Indian"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
        </View>

        <CustomButton
            title="Vegan"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="Vegetarian"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="pescatarian"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="plant based"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="gluten free"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="nut free"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="lactose intolerant"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="low sodium"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="paleo"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
          <CustomButton
            title="keto"
            handlePress={()=>{}}
            containerStyles="w-[105px] min-h-[75px] text-base m-1"
            isLoading={()=>{}} 
          />
        </View>
        <View className="w-[105px] min-h-[75px] text-base m-1">
          <Text>
            Upload your Photos
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{ uri: form.video.uri }}
                className=" w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-400 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-primary-300 justify-center items-center">
                  <Image 
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
            <Text className=" text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
                source={{ uri: form.thumbnail.uri}}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-400 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image 
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                  <Text text-sm text-gray-100 font-pmedium>
                    Choose a file
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton 
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default newRecipe