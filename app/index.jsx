import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';

import { images } from '../constants';
import dinner from "../assets/images/dinner.png";
import CustomButton from '../components/CustomButton';

import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
    
    const {isLoading, isLoggedIn } = useGlobalContext();

    if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{
          height: "100%",
        }}>
            <ImageBackground source={dinner} style={styles.container}>
            <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
                <Image 
                    source={images.cookUp}
                    className="w-[250px] h-[84px]"
                    resizeMode="contain"
                />
                <Text className="text-4xl text-white text-center">
                    Meal prep made easy.
                </Text>
                <Image 
                    source={images.recipe}
                    className="max-w-[380px] w-full h-[300px]"
                    resizeMode="contain"
                />
                <View className="relative mt-5">
                    <Text className="text-2xl text-white text-center">
                        Create Custom Menus
                    </Text>
                    <Image 
                        className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                        resizeMode="contain"
                    />
                </View>
                <CustomButton 
                    title="Sign up"
                    handlePress={() => router.push('/sign-up')}
                    containerStyles="w-40 mt-7"
                />
                <View className="pb-8">

                </View>
                <View className="bg-white opacity-60">
                    
                    <Text className="text-xl text-black text-center">
                        already have an account? {' '}
                        <Link href={'/sign-in'} className="text-System-400 font-pblack">Login</Link>
                    </Text>
                </View>
            </View>
            </ImageBackground>
        </ScrollView>

        <StatusBar 
         backgroundColor='#161622'
         style='light'
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height:'100px',
        width: '400px',
        resizeMode:'cover',
    },
});