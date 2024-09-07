import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import fpIcon from '../constants/images';
import FontLoader from '../utils/FontLoader';
import CustomButton from '../components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

// Component for individual pages in the onboarding flow
const Onboarding = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  // Progress indicators (dots)
  const steps = [
    'Landing', 
    'Serving Size', 
    'Purpose', 
    'Dietary Restrictions', 
    'Food Allergies'
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
        navigation.navigate('Home');
        console.log('Submit all data');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    navigation.replace('Drawer', {screen: 'Home'}); // Navigate to Home or any main screen
  };

  const buttonText = step === 0 ? 'Start' : step === steps.length - 1 ? 'Submit' : 'Next';
  const buttonColor = step === steps.length - 1 ? '#dd5b46' : '#4f753e';

  const sizes = [
    { id: 1, src: require('../assets/images/myself.png') }, // Replace with your image paths
    { id: 2, src: require('../assets/images/for_two.png') },
    { id: 3, src: require('../assets/images/family.png') }
  ];

  const handleSelectSize = (sizeId) => {
    setSelectedSize(sizeId);
  };

  // Conditionally render steps
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <LandingPage />;
      case 1:
        return (
          <View style={styles.pageContainer}>
            <View style={styles.portionTitleContainer}>
            <Text style={styles.title}>A meal for one or meals for some?</Text>
            <Text style={styles.subtitle}>Select who you're making making these meals for.</Text>
            </View>
            <View style={styles.portionImageContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={[
                    styles.portionImageBox,
                    selectedSize === size.id ? styles.portionSelected : null
                  ]}
                  onPress={() => handleSelectSize(size.id)}
                >
                  <Image source={size.src} style={styles.portionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 2:
        return <PurposePage selectedPurpose={selectedPurpose} setSelectedPurpose={setSelectedPurpose}/>;
      case 3:
        return <DietaryRestrictionsPage />;
      case 4:
        return <AllergyPage />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top navigation with back and skip buttons */}
      <View style={styles.topNav}>
        {step > 0 && (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <View style={styles.dotContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === step ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Render page content based on step */}
      {renderStepContent()}
      
      <CustomButton 
            text={buttonText}
            color={buttonColor}
            onPress={handleNext}
            style = {styles.button}
        />
    </SafeAreaView>
  );
};

const ImageSelection = ({ source, onPress, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[
            styles.imageContainer,
            isSelected ? styles.selected : null
        ]}>
            <Image source={source} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
    );
};

 // Sample step components
const LandingPage = ({ onNext }) => (
  <View style={styles.pageContainer}>
    <View style={styles.titleContainer}>
        <Text style={styles.title}>Let's Customize your experience</Text>
    <Text style={styles.subtitle}>Cook Up strives to serve their users it's best dish. By completing this short intake form. we'll give you a better experience more catered to you</Text>  
    </View>
    <View style={styles.imageContainer}>
         <Image 
            source={require('../assets/images/fp-icon2.png')} 
            style={styles.image}
            resizeMode='contain'
        />
    </View>
  </View>
);

const ServingSizePage = ({ onNext, onBack }) => {
  const [selectedSize, setSelectedSize ] = useState(null);

  const sizes = [
    { id: 1, src: require('../assets/images/myself.png')},
    { id: 2, src: require('../assets/images/for_two.png')},
    { id: 3, src: require('../assets/images/family.png')},
  ];

  const handleSelectedSize = (sizeId) => {
    setSelectedSize(sizeId);
  };

  <View style={styles.pageContainer}>
    <Text style={styles.title}>A meal for one or meals for some?</Text>
    <Text style={styles.subtitle}>Select who you're making making these meals for.</Text>
    <View style={styles.portionImageContainer}>
      {sizes.map((size) => (
        <TouchableOpacity
          key={size.id}
          style={[
            styles.portionImageBox,
            selectedSize === size.id ? styles.portionSelected : null
          ]}
          onPress={() => handleSelectedSize(size.id)}
        >
          <Image source={size.src} style={styles.portionImage} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
};

const PurposePage = ({ selectedPurpose, setSelectedPurpose }) => {

  const purposes = [
    { id: 1, label: 'Health' },
    { id: 2, label: 'Life Style' },
    { id: 3, label: 'Meal Planning' },
    { id: 4, label: 'Tracking Nutrients' }
  ];

  const handleSelectPurpose = (purposeId) => {
    setSelectedPurpose(purposeId);
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.reasonTitle}>What is your Primary objective using Cook Up?</Text>
      <View style={styles.optionsContainer}>
        {purposes.map((purpose) => (
          <TouchableOpacity
            key={purpose.id}
            style={[
              styles.optionButton,
              selectedPurpose === purpose.id ? styles.ReasonSelectedOption : null
            ]}
            onPress={() => handleSelectPurpose(purpose.id)}
          >
            {/* Ionicons Checkmark */}
            <View style={[styles.checkbox, selectedPurpose === purpose.id ? styles.checkedCheckbox : null]}>
              {selectedPurpose === purpose.id && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </View>
            <Text style={styles.optionLabel}>{purpose.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const DietaryRestrictionsPage = ({ onNext, onBack }) => (
  <View style={styles.pageContainer}>
    <Text style={styles.title}>Do you have any dietary restrictions?</Text>
    <Button title="Vegan" onPress={onNext} />
    <Button title="Gluten-Free" onPress={onNext} />
    <Button title="None" onPress={onNext} />
  </View>
);

const AllergyPage = ({ onNext, onBack }) => (
  <View style={styles.pageContainer}>
    <Text style={styles.title}>Do you have any food allergies?</Text>
    <Button title="Peanuts" onPress={onNext} />
    <Button title="Shellfish" onPress={onNext} />
    <Button title="Dairy" onPress={onNext} />
  </View>
);

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    fontSize: 16,
    color: 'blue',
  },
  skipText: {
    fontSize: 16,
    color: 'blue',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer:{
    position: 'absolute',
    top: 60,
    left: 20,
    width: '100%',
  },
  portionTitleContainer:{
    position: 'absolute',
    top: 60,
    left: 25,
    width: '85%',
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold, Arial',
    color: '#4f753e',
  },
  imageContainer:{
    paddingTop: 250,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:325,
    height: 325,
  },
  portionImage:{
    width: 80,
    height: 80,
  },
  portionImageBox: {
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portionImageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  portionSelected: {
    borderColor: '#ff6347',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    fontFamily: 'Poppins-SemiBold, Arial',
  },
  button:{
    width: 50,
  },
  reasonTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold, Arial',
    color: '#4f753e',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#4f753e', // Highlight the selected option
    backgroundColor: '#eaf5e0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    borderColor: '#4f753e', // Green border when checked
    backgroundColor: '#4f753e',
  },
  checkmark: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  optionLabel: {
    fontSize: 18,
    color: '#333',
  },
});
