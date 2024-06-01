import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

import { icons, images } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '')

  return (
    <View className="border-2 border-black-400 w-full h-16 px-4 bg-black-500 rounded-2xl focus:border-System-800 items-center flex-row space-x-4">
        <TextInput 
            className="text-base mt-0.5 text-black-200 flex-1 font-pregular"
            value={query}
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
            onPress={() => {
                if(!query) {
                    return Alert.alert('Missing query', "Please input something to search results across database")
                }
                if (pathname.startsWith('/search')) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}
        >
            <Image 
                source={icons.search}
                className='w-5 h-5'
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput