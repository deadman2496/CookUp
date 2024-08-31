import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import FontLoader from '../../utils/FontLoader';

const WelcomeScreen = ({ navigation }) => {

    const handleStart = () => {
        navigation.navigate('StepOne');
    };
    return (
        <ImageBackground source={require('../../assets/images/dinner.png')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
        <View style={styles.container}>
            <Text style={styles.title}>Cook Up</Text>
            <Text style={styles.subtitle}>Meal prep made easy</Text>
            {/* add the introductory image here */}
            <Image
                source={require('../../assets/images/WelcomeImage.png')}
                style={styles.image}
            />
            <Text style={styles.message}>Create Your Menu</Text>
            <Text style={styles.message}>Customize your Grocery List</Text>
            <Text style={styles.message}>Discover Great Meals</Text>
            
        <TouchableOpacity style={styles.loginButton} onPress={handleStart}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
        <Text style={styles.SignUpText}>already have an account </Text> 
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}><Text style={styles.link}>Log in</Text></TouchableOpacity>
        <Text style={styles.SignUpText}>!</Text>
        </View>
        </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent:'center',
    },
    overlay: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0 0.5)'
    },  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 275,
        height: 275,
    },
    title: {
        fontFamily: 'Shrikhand-Regular',
        fontSize: 75, 
        marginBottom: 5,
        textAlign: 'center',
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 23,
        textAlign: 'center',
        color: '#fff'
    },
    message:{
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        textAlign: 'center',
        color: '#fff'
    },
    orText: {
        fontSize: 16,
        marginVertical: 10,
    },
    loginButton:{
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf:'center',
        width: 200,
        marginTop: 10
    },
    loginButtonText:{
        color:'#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        width: 300,
    },
    link: {
        color: '#DD5B46',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
});

export default WelcomeScreen;
