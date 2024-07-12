import { View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { StatusBar} from 'expo-status-bar';
import { images } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Loading from './loading';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { CachedImage } from '../helpers/image';
import axios from 'axios';
import { Platform } from 'react-native';

const ios = Platform.OS=='ios';


export default function RecipeDetail(props) {
  let item = props.route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  },[])

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`);
      // console.log('got meal data: ', response.data);
      if(response && response.data){
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch(err){
      console.log('error: ', err.message);
    }
  }

  const ingredientsIndexes = (meal) =>{

    if(!meal) return [];
    let indexes = [];
    for(let i = 1; i<20; i++){
      if(meal['strIngredient'+i]){
        indexes.push(i);
      }
    }

    return indexes;
  }

  const getYoutubeVideoId = url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  const handleOpenLink = url=>{
    Linking.openURL(url);
  }
  return (
    <View className="flex-1 bg-white relative">
    <StatusBar style={"light"} />
    <ScrollView
      className = "bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"}/>
      {/* recipe image */}
      <View
        className="flex-row justify-center"
      >
        <CachedImage 
          src={item.strMealThumb}
          style={{width: wp(100), height: hp(50), borderBottomLeftRadius:40, borderBottomRightRadius: 40}}
        />
      </View>

      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
          <TouchableOpacity onPress={() => NavigationPreloadManager.goBack()} className="w-full absolute flex-row justify-between items-center pt-14">
              <ChevronLeftIcon className="text-lg text-System-500" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!IsFavorite)} className="p-2 rounded-full mr-5 bg-white">
              <HeartIcon className="text-lg" color={isFavorite? "red": "gray"} />
          </TouchableOpacity>
      </Animated.View>
      {/* meal description */}
      {
        loading? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name and area */}
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
              <Text className="font-bold flex-1 text-neutral-700 text-md">
                  {meal?.strMeal}
              </Text>
              <Text className="font-medium flex-1 text-neutral-500 text-md">
                  {meal?.strArea}
              </Text>
            </Animated.View>

            {/* misc */}
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  className="h-2 w-2 bg-white rounded-full flex items-center justify-center"
                >
                  <ClockIcon className="text-lg text-System-500" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text className="text-base font-bold text-neutral-700">
                    35
                  </Text>
                  <Text className="text-sm font-bold text-neutral-700">
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View className="bg-white rounded-full flex items-center justify-center">
                  <UsersIcon className="text-lg text-System-500" />
                </View>
              
              <View className="flex items-center py-2 space-y-1">
                <Text className="text-base font-bold text-neutral-700">
                  03
                </Text>
                <Text className="text-sm font-bold text-neutral-700">
                  Servings
                </Text>
              </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  className="h-2 w-2 bg-white rounded-full flex items-center justify-center"
                >
                    <FireIcon className="text-lg text-System-500" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text className="font-bold text-neutral-700 text-base">
                    103
                  </Text>
                  <Text className="font-bold text-neutral-700 text-sm">
                    Cal
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  className="h-2 w-2 bg-white rounded-full flex items-center justify-center"
                >
                    <Square3Stack3DIcon className="text-lg text-System-500" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text className="font-bold text-neutral-700 text-base">
                    
                  </Text>
                  <Text className="font-bold text-neutral-700 text-sm">
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
              <Text className="font-bold flex-1 text-neutral-700 text-base">
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {
                  ingredientsIndexes(meal).map(i=>{
                    return (
                      <View key={i} className="flex-row space-x-4">
                        <View className="bg-amber-300 rounded-full"/>
                        <View className="flex-row space-x-2">
                            <Text className="font-pextrabold text-neutral-700 text-sm">{meal['strMeasure'+i]}</Text>
                            <Text className="font-pmedium text-neutral-600 text-sm">{meal['strIngredient'+i]}</Text>
                        </View>  
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            {/* instructions */}
            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                <Text className="font-bold flex-1 text-neutral-700 text-base">
                  Instructions
                </Text>
                <Text className="text-neutral-700 text-sm">
                    {meal?.strInstructions}
                </Text>
            </Animated.View>

            {/* recipe video */}

            {
              meal.strYoutube && (
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                  <Text className="font-bold flex-1 text-neutral-700 text-base">
                    Recipe Video
                  </Text>
                  <View>
                    {
                      ios? (
                        <YouTubeIframe 
                          webViewProps={{
                            overScrollMode: "never"
                          }}
                          videoId={getYoutubeVideoId(meal.strYoutube)}
                          height={hp(30)}
                        />
                      ) : (
                        <TouchableOpacity className="mb-5" onPress={()=> handleOpenLink(meal.strYoutube)}>
                          <Text className="text-base text-blue-600">{meal.strYoutube}</Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </Animated.View>
              )
            }
          </View>
        )
      }
    </ScrollView>
    </View>
  )
}
