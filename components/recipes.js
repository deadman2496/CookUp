import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import { poundCake } from '../constants/images';
import { router, } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';
import { CachedImage } from '../helpers/image';

export default function Recipes({categories, meals}) {
    const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text className="text-2xl font-psemibold text-neutral-500">Recipes</Text>
      <View>
        {
          categories.length==0 || meals.length==0? (
            <Loading size="large" className="mt-20" />
           ): ( 
        <MasonryList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
          onEndReachedThreshold={0.1}
        />
        )
      }
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index%2==0
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable 
                className="w-full flex justify-center px-3 mb-4 space-y-1"
                onPress={() => navigation.navigate('RecipeDetailScreen', {...item})}
                >
                <Image  
                    source={{uri: item.strMealThumb}}
                    className="w-full h-[250px] bg-black/5 rounded-[35px]"
                />
                {/* <CachedImage 
                  uri={item.strMealThumb}
                  className="w-full h-8 rounded-[35px] bg-black/5"
                /> */}
                <Text className="font-psemibold ml-2 text-neutral-600 text-xs">
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}