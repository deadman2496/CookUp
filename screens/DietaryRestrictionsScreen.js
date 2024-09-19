import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import FilterTag from '../components/FilterTags'; // Assuming FilterTags.js is in the components folder

const initialDietaryRestrictionsList = [
  'Vegan', 'Vegetarian', 'Pescatarian', 'Plant Based', 'Gluten Free',
  'Nut Free', 'Lactose Intolerant', 'Low Sodium', 'Paleo', 'Keto'
];

const initialAllergyList = [
  'Peanuts', 'Shellfish', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Fish', 'Tree Nuts'
];

const filterColors = {
    preferences: '#F6CB98',
    allergies: '#EDA79C',
};

const DietaryRestrictionsPage = () => {
  const [activeTab, setActiveTab] = useState('DietaryRestrictions'); // Tab state
  const [selectedTags, setSelectedTags] = useState([]); // Selected dietary restrictions and allergies
  const [dietaryRestrictionsList, setDietaryRestrictionsList] = useState(initialDietaryRestrictionsList);
  const [allergyList, setAllergyList] = useState(initialAllergyList);
  const [isModalVisible, setModalVisible ] = useState(false); // sets the state of the modal.
  const [customTag, setCustomTag] = useState(''); // Custom input tag

  // Handle selecting or unselecting tags
  const handleTagPress = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomPress = () => {
    setModalVisible(true); // Show modal
  };

  // Add custom tag
  const handleAddCustomTag = () => {
    if (customTag.trim() === '') return;
    if (activeTab === 'DietaryRestrictions'){
        setDietaryRestrictionsList([...dietaryRestrictionsList, customTag]);
    } else {
        setAllergyList([...allergyList, customTag]);
    }
    setSelectedTags([...selectedTags, customTag]);
    setCustomTag(''); // Clear input
    setModalVisible(false); // Closes Modal
  };

  // Data to display based on active tab
  const tagsToDisplay = activeTab === 'DietaryRestrictions' ? dietaryRestrictionsList : allergyList;
  const tagType = activeTab === 'DietaryRestrictions' ? 'dietaryPreferences' : 'allergies';

  const customButtonColor = activeTab === 'DietaryRestrictions' ? '#F6CB98' : '#EDA79C';



  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'DietaryRestrictions' && styles.activeTab]}
          onPress={() => setActiveTab('DietaryRestrictions')}
        >
          <Text style={[styles.tabText, activeTab === 'DietaryRestrictions' && styles.activeTabText]}>
            Dietary Restrictions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Allergies' && styles.activeTab]}
          onPress={() => setActiveTab('Allergies')}
        >
          <Text style={[styles.tabText, activeTab === 'Allergies' && styles.activeTabText]}>
            Allergies
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {activeTab === 'DietaryRestrictions' ? 'Dietary Restrictions?' : 'Allergens'}
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {activeTab === 'DietaryRestrictions'
          ? 'Here you can indicate any restriction in your diet, and we’ll try our best to recommend recipes within your confines.'
          : 'Please select any allergens you are sensitive to so we can ensure recipes are safe for you to enjoy.'}
      </Text>

      {/* Tag List */}
      <View style={styles.tagContainer}>
        {/* {tagsToDisplay.map((tag, index) => (
          <FilterTag
            key={index}
            label={tag}
            selected={selectedTags.includes(tag)}
            onPress={() => handleTagPress(tag)}
            type={tagType}
          />
        ))} */}
        {tagsToDisplay.map((tag, index) => (
            <FilterTag
              key={index}
              label={tag}
              selected={selectedTags.includes(tag)}
              onPress={() => handleTagPress(tag)}
              type={tagType}
            />
          ))}

          {/* Custom Button for adding new restriction/allergy */}
          <TouchableOpacity
            onPress={handleAddCustomPress}
            style={[styles.customTagButton, { backgroundColor: customButtonColor }]}
          >
            <Text style={styles.customTagButtonText}>+ Add custom {activeTab === 'DietaryRestrictions' ? 'restriction' : 'allergy'}</Text>
          </TouchableOpacity>
      </View>
      
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
    </ScrollView>

    {/* Modal for Custom Tag Input */}
    <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={customTag}
              onChangeText={setCustomTag}
              placeholder={`Add custom ${activeTab === 'DietaryRestrictions' ? 'restriction' : 'allergy'}`}
              style={styles.modalInput}
            />
            <TouchableOpacity onPress={handleAddCustomTag} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#4f753e', // Green color for active tab underline
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#4f753e', // Green color for active tab text
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4f753e',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  customTagInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4f753e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#f57c00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  customTagButton: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#F6CB98',
    borderRadius: 25,
    borderColor: '#ccc',
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  customTagButtonText: {
    fontSize: 14,
    color: '#888',
  },
  submitButton: {
    backgroundColor: '#f57c00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4f753e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#f57c00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DietaryRestrictionsPage;
