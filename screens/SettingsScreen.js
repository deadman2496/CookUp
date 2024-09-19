// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Button, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/LoggedInHeader';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isPublicProfileEnabled, setIsPublicProfileEnabled] = useState(true);
  const [isCaloriesOptInEnabled, setIsCaloriesOptInEnabled] = useState(true);
  const [name, setName] = useState(' Change your name? ');
  const [links, setLinks ] = useState (' insert Link here ');
  const [bio, setBio] = useState('Write for your bios here');
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const [notificationsExpanded, setNotificationsExpanded] = useState(false);
  const [phoneNumberExpanded, setPhoneNumberExpanded] = useState(false);
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [usernameExpanded, setUsernameExpanded] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');


  const togglePublicProfile = () => setIsPublicProfileEnabled(!isPublicProfileEnabled);
  const toggleCaloriesOptIn = () => setIsCaloriesOptInEnabled(!isCaloriesOptInEnabled);
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);
  const togglePasswordSection = () => setPasswordExpanded(!passwordExpanded);
  const toggleNotificationsSection = () => setNotificationsExpanded(!notificationsExpanded);
  const togglePhoneNumberSection = () => setPhoneNumberExpanded(!phoneNumberExpanded);
  const toggleEmailSection = () => setEmailExpanded(!emailExpanded);
  const toggleUsernameSection = () => setUsernameExpanded(!usernameExpanded);

  const handleSubmit = (type) => {
    switch (type) {
      case 'password':
        Alert.alert('Password updated successfully.');
        break;
      case 'phone':
        Alert.alert('Phone number updated successfully.');
        break;
      case 'email':
        Alert.alert('Email updated successfully.');
        break;
      case 'username':
        Alert.alert('Username updated successfully.');
        break;
      default:
        break;
    }
  };


  const renderExpandableItem = (title, expanded, onPress, content) => (
    <>
      <TouchableOpacity style={styles.expandableContainer} onPress={onPress}>
      <Animated.View style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}>
          <Icon name="chevron-right" size={24} color="#333" />
        </Animated.View>
        <Text style={styles.expandableText}>{title}</Text> 
      </TouchableOpacity>
      {expanded && <View style={styles.expandableContent}>{content}</View>}
    </>
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
      <Header title="Settings" isMenu={true} />
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

      {/* Expandable Sections
      {renderExpandableItem('Password')}
      {renderExpandableItem('Notifications')}
      {renderExpandableItem('Phone Number')}
      {renderExpandableItem('Email')}
      {renderExpandableItem('Username')}
      {renderExpandableItem('Notifications')} */}

      {/* Password Section */}
      {renderExpandableItem('Password', passwordExpanded, togglePasswordSection, (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Submit" onPress={() => handleSubmit('password')} color="#4f753e" />
          </>
        ))}

        {/* Notifications Section */}
        {renderExpandableItem('Notifications', notificationsExpanded, toggleNotificationsSection, (
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>
        ))}

        {/* Phone Number Section */}
        {renderExpandableItem('Phone Number', phoneNumberExpanded, togglePhoneNumberSection, (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter new phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <Button title="Submit" onPress={() => handleSubmit('phone')} color="#4f753e" />
          </>
        ))}

        {/* Email Section */}
        {renderExpandableItem('Email', emailExpanded, toggleEmailSection, (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter new email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Button title="Submit" onPress={() => handleSubmit('email')} color="#4f753e" />
          </>
        ))}

        {/* Username Section */}
        {renderExpandableItem('Username', usernameExpanded, toggleUsernameSection, (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={username}
              onChangeText={setUsername}
            />
            <Button title="Submit" onPress={() => handleSubmit('username')} color="#4f753e" />
          </>
        ))}

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
    alignItems: 'center',
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
