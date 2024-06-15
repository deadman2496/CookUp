import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Form from '../../components/Form';


export default function info() {
  return (
    <View style={styles.container}>
      <Text>React Native MultiStep Form</Text>
      <Form />
      <StatusBar style="auto" />
    </View>
  );
}

const styles= StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems:"center",
        justifyContent: "center",
    },
});
