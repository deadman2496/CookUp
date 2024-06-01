import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({
    title, handlePress, containerStyles, textStyles, isLoading
}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-primary-400 rounded-xl min-h-[52px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' :  ''}`}
    disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-2xl ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton