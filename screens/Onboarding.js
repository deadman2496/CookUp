import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import * as images from '../constants/images';

const Onboarding = ({ navigation }) => {
    const [step, setStep ] = useState(0);

    const steps = [
        'Landing',
        'Serving Size',
        'Purpose',
        'Dietary Restrictions',
        'Food Allergies'
    ];

    const handleNext = () => {
        if (step < steps.length - 1){
            setStep(step - 1);
        }
    };

    const handleBack = () => {
        if (step > 0 ){
            setStep(step - 1);
        }
    };

    const handleSkip = () => {
        navigation.navigate('Home');
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return <LandingPage onNext={handleNext} />;
            case 1:
                return <ServingSizePage onNext={handleNext} onBack={handleBack} />
            case 2:
                return <PurposePage onNext={handleNext} onBack={handleBack} />
            case 3:
                return <DietaryRestrictionsPage onNext={handleNext} onBack={handleBack} />
            case 4:
                return <AllergyPage onNext={handleNext} onBack={handleBack} />
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={StyleSheet.container}>
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

            {/* shows content based on step */}
            {renderStepContent()}
        </SafeAreaView>
    );
};

const LandingPage = ({ onNext }) => (
    <View>
        <Text>Let's Customize your experience! </Text>
        <Text>Cook Up strives to serve their users it's best dish. By completing this short intake form. we'll give you a better experience more catered to you</Text>
        <Image source={images.fpIcon} />
        <Button title='Next' onPress={onNext} />
    </View>
);

const ServingSizePage = ({ onNext, onBack }) => (
    <View style={styles.pageContainer}>
        <Text style={styles.title}>select who you're making these meals for.</Text>
        <Button title='1' onPress={onNext} />
        <Button title='2' onPress={onNext} />
        <Button title='4' onPress={onNext} />
    </View>
);

const PurposePage = ({ onNext, onBack }) => (
    <View style={styles.pageContainer}>
        <Text style={styles.title}>What is your Primary objective using Cook Up?</Text>
        <Button title='Health' onPress={onNext} />
        <Button title='Life Style' onPress={onNext} />
        <Button title='Meal Planning' onPress={onNext} />
        <Button title='Tracking Nutrients' onPress={onNext} />
    </View>
);

const DietaryRestrictionsPage = ({ onNext, onBack }) => (
    <View style={styles.pageContainer}>
        <Text style={style.title}>Do you have and dietary restrictions?</Text>
        <Text>Here you can indicate any restrictions in your diet, and we'll try our best to recommend recipes within your confines, or let you know if a recipe clashes with your selection.</Text>
        <Button title="Vegan" onPress={onNext} />
        <Button title="Gluten-Free" onPress={onNext} />
        <Button title="None" onPress={onNext} />
    </View>
);

const AllergyPage = ({ onNext, onBack }) => (
    <View style={styles.pageContainer}>
        <Text>Allergens</Text>
        <Text>While <Text>Cook Up</Text> strives to give our users their best experience, we also indicate that it is the users responsibility to double check recipes and nutritional information before embarking on your cooking adventures</Text>
        <Button title='Peanuts' onPress={onNext} />
        <Button title='ShellFish' onPress={onNext} />
        <Button title='Dairy' onPress={onNext} />
        <Button title='Hazelnuts' onPress={onNext} />
    </View>
);

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },  
    topNav:{
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor:'gray',
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
    },
});