import React, { useState, useContext } from 'react';
import { View, Switch, Button, Text, StyleSheet } from 'react-native';

const FilterScreen = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // Implement your filter controls here

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adjust your filters</Text>
      <View style={styles.filterContainer}>
        <Text>Enable Advanced Options:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title="Apply Filters" onPress={() => navigation.closeDrawer()} />
      <Switch onValueChange={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default FilterScreen;
