import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import { poundCake } from '../constants/images';
import { router, } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';
import { CachedImage } from '../helpers/image';
import { useGlobalContext } from '../context/GlobalProvider';

export default function Recipestrend({categories, meals}) {

    const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text className="text-2xl font-psemibold text-neutral-500">On Your Menu</Text>
      <View>
        <MasonryList
          data={mealData}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
          onEndReachedThreshold={0.1}
          className="container"
          horizontal
        />
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation}) => {
  const { user, setUser, setIsLogged } = useGlobalContext();

    let isEven = index%2==0
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable 
                className="w-full flex justify-center pr-2 "
                onPress={() => navigation.navigate('RecipeDetailScreen', {...item})}
                >
                <View className="w-full" >
                <Image  
                    source={{uri: item.image}}
                    className="w-full h-[125px] bg-black/5 rounded-t-xl"
                />
                </View>
                <View className="w-[200px] h-[125px] lg:h-[250px] justify-start rounded-b-xl border shadow-lg shadow-black" style={{elevation: 2}}>
                <Text className="font-pmedium ml-1 mb-3 text-neutral-700 text-xs"> Review Placeholder</Text>
                <Text className=" font-psemibold ml-1 mb-2 text-neutral-600 text-xs">
                    {
                       item.name
                    }
                </Text>
                    <Text className="font-pmedium ml-1 mb-2 text-neutral-700 text-xs">filter Placeholder</Text>
                    <Text className="font-pmedium ml-1 mb-2 text-neutral-700 text-xs">by {user?.username}</Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation:6,
  }
})