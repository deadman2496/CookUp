import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { account } from '../lib/appwrite';
import FontLoader from '../utils/FontLoader';


const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError ] = useState(null);
    const fontsLoaded = FontLoader();

    if (!fontsLoaded){
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleSignIn =  async () => {
        try {
            await account.createEmailSession(email, password);
            navigation.navigate('Home'); // Navigates to home when successful
        } catch (err) {
            setError(err.message);
        }
    };

    
return (
    <ImageBackground source={require('../assets/images/dinner.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
    <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Cook Up</Text>
        <Text style={styles.message}>Welcome Back!</Text>
        </View>
        {error && <Text>{error}</Text>}
        <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
        />
        <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
        <Text style={styles.SignUpText}>Not yet a member? </Text> 
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.link}>Sign Up</Text></TouchableOpacity>
        <Text style={styles.SignUpText}>!</Text>
        </View>
    </View>
    </View>
    </ImageBackground>
);
};

const styles= StyleSheet.create({
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
        padding: 20,
        
    },
    title: {
        fontFamily: 'Shrikhand-Regular',
        fontSize: 75, 
        marginBottom: 5,
        textAlign: 'center',
        color: '#fff',
    },
    message: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 23,
        textAlign: 'center',
        color: '#fff'
    },
    titleContainer: {
        marginBottom: 95,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 25,
        backgroundColor: 'rgba(255,255,255,0.8)',
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
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
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

export default SignInScreen;
