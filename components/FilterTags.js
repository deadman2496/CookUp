import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const filterColors = {
    mealType: '#86971C',
    cuisine:'#B8AA00',
    dietaryPreferences: '#E18314',
    averageCost: '#474847',
    custom: '#E0E0E0',
    allergies: '#CA3C25',
};

const FilterTag = ({ label, selected, onPress, type}) => {
    const backgroundColor = selected ? filterColors[type] : 'transparent';
    const borderColor = filterColors[type];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.tagContainer,
                {backgroundColor, borderColor},
                selected && styles.selectedTag,
            ]}
        >
            <Text style={[styles.tagText, selected && { color: '#fff'}]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tagContainer: {
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 25,
      borderWidth: 2,
      marginRight: 5,
      marginBottom: 5,
    },
    selectedTag: {
      borderColor: 'transparent',
    },
    tagText: {
      fontSize: 10,
      color: '#333',
    },
  });
  
  export default FilterTag;