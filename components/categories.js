import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {categoryData} from '../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screens';
import Animated,{ scrollTo } from 'react-native-reanimated';



export default function Categories({categories,activeCategory, handleChangeCategory}) {

  return (
    <Animated.View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                categories.map((cat,index) => {
                    let isActive = cat.strCategory==activeCategory;
                    let activeButtonClass = isActive? ' bg-primary-400': ' bg-black/10';
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChangeCategory(cat.strCategory)}
                            className="flex items-center space-y-1"
                        >
                            <View className={"rounded-full p-[6px]"+activeButtonClass}>
                                <Image
                                    source={{uri: cat.strCategoryThumb}}
                                    className="rounded-full w-12 h-12"
                                />
                            </View>
                            <Text className="text-neutral-600 text-sm">
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}
