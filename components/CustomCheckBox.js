import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomCheckbox = ({ isChecked, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Icon
        name={isChecked ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={isChecked ? '#4f753e' : '#ccc'}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CustomCheckbox;
