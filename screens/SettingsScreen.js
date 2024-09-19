// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isPublicProfileEnabled, setIsPublicProfileEnabled] = useState(true);
  const [isCaloriesOptInEnabled, setIsCaloriesOptInEnabled] = useState(true);
  const [name, setName] = useState(' Change your name? ');
  const [links, setLinks ] = useState (' insert Link here ');
  const [bio, setBio] = useState('Write for your bios here');


  const togglePublicProfile = () => setIsPublicProfileEnabled(!isPublicProfileEnabled);
  const toggleCaloriesOptIn = () => setIsCaloriesOptInEnabled(!isCaloriesOptInEnabled);
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

  const renderExpandableItem = (title) => (
    <TouchableOpacity style={styles.expandableContainer}>
      <Icon name="chevron-right" size={24} color="#333" />
      <Text style={styles.expandableText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Log Out", onPress: () => console.log('User logged out') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
       {/* Name, Links, Bio */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Links</Text>
        <TextInput
          style={styles.input}
          value={links}
          onChangeText={setLinks}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.textArea}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      {/* Expandable Sections */}
      {renderExpandableItem('Password')}
      {renderExpandableItem('Notifications')}
      {renderExpandableItem('Phone Number')}
      {renderExpandableItem('Email')}
      {renderExpandableItem('Username')}
      {renderExpandableItem('Notifications')}

      {/* Public Profile Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Public Profile</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPublicProfileEnabled ? "#4f753e" : "#f4f3f4"}
          onValueChange={togglePublicProfile}
          value={isPublicProfileEnabled}
        />
      </View>

      {/* Calories Opt-In/Out Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Calories Opt In/Opt Out</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCaloriesOptInEnabled ? "#4f753e" : "#f4f3f4"}
          onValueChange={toggleCaloriesOptIn}
          value={isCaloriesOptInEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Enable Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkModeEnabled}
        />
      </View>
      <Button title="Log Out" onPress={handleLogout} color="#FF6347" />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 100,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  expandableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expandableText: {
    fontSize: 18,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleLabel: {
    fontSize: 18,
  },
});

export default SettingsScreen;
