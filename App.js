// App.js
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { FavoriteRecipesProvider } from './contexts/BookmarkContext';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import YourMenusPage from './screens/YourMenusScreen';
import DietaryRestrictionsPage from './screens/DietaryRestrictionsScreen';
import RecipeBoxScreen from './screens/RecipeBoxScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import GroceryListScreen from './screens/GroceryListScreen';
import ReviewPage from './screens/ReviewPage';
import SignInScreen from './(auth)/sign-in';
import { Button, View } from 'react-native';
import SearchScreen from './screens/SearchScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { checkAuth, signOutUser } from './utils/auth';
import StepOne from './(auth)/sign-up/StepOne';
import StepTwo from './(auth)/sign-up/StepTwo';
import StepThree from './(auth)/sign-up/StepThree';
import StepFour from './(auth)/sign-up/StepFour';
import OnboardingStepOne from './screens/OnboardingScreen/IntroductionScreen';
import OnboardingStepTwo from './screens/OnboardingScreen/ServingSizeSelectionScreen';
import OnboardingStepThree from './screens/OnboardingScreen/RadioSelectionScreen';
import OnboardingStepFour from './screens/OnboardingScreen/DietaryRestrictionsScreen';
import OnboardingStepFive from './screens/OnboardingScreen/AllergiesScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './(auth)/sign-up/StepZero';
import { useFonts } from 'expo-font';
import FontLoader from './utils/FontLoader';
import Onboarding from './screens/Onboarding';
import AuthNavigator from './navigation/AuthNavigator';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export function SignUp() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Customize sliding animation
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StepOne" component={StepOne} options={{ headerShown: false }} />
      <Stack.Screen name="StepTwo" component={StepTwo} options={{ headerShown: false }} />
      <Stack.Screen name="StepThree" component={StepThree} options={{ headerShown: false }} />
      <Stack.Screen name="StepFour" component={StepFour} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function Onboard() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="SignUp"
    >
      <Stack.Screen name="OnboardPage" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Recipe Box') {
            iconName = 'book-outline';
          } else if (route.name === 'New Recipe') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Grocery List') {
            iconName = 'basket-outline';
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Recipe Box" component={RecipeBoxScreen} options={{ headerShown: false }} />
      <Tab.Screen name="New Recipe" component={NewRecipeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Grocery List" component={GroceryListScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOutUser();
      setIsAuthenticated(false);
      alert('Logged out Successfully');
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

function NoDrawerStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RecipeDetails" 
        component={RecipeDetailScreen} 
        //options={{ gestureEnabled: false, headerShown: false }} 
        options={({ navigation }) => ({
          title: 'Recipe Details',
          headerLeft: () => (
            <Ionicons 
              name='arrow-back-outline'
              size={24}
              color="black"
              onPress={() => navigation.goBack()} 
            />
          ),
        })}
        />
      <Stack.Screen 
        name="ReviewPage" 
        component={ReviewPage} 
        //options={{ gestureEnabled: false, headerShown: false }}
        options={({ navigation }) => ({
          title: 'Reviews',
          headerLeft: () => (
            <Ionicons 
              name='arrow-back-outline'
              size={24}
              color="black"
              onPress={() => navigation.goBack()} 
            />
          ),
        })} 
      />
      <Stack.Screen 
        name="NewRecipe" 
        component={NewRecipeScreen} 
        //options={{ gestureEnabled: false, headerShown: false }}
        options={({ navigation }) => ({
          title: 'New Recipe',
          headerLeft: () => (
            <Ionicons 
              name='arrow-back-outline'
              size={24}
              color="black"
              onPress={() => navigation.goBack()} 
            />
          ),
        })} 
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Your Menus" component={YourMenusPage} options={{ headerShown: false }} />
      <Drawer.Screen name="Dietary Restrictions" component={DietaryRestrictionsPage} options={{ headerShown: false }} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

// const AuthNavigator = () => (
//   <Stack.Navigator initialRouteName={isFirstTime ? 'SignUp' : 'SignIn'}>
//     <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
//     <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const firstTime = await AsyncStorage.getItem('isFirstTime');
      if (firstTime === null) {
        setIsFirstTime(true);
        await AsyncStorage.setItem('isFirstTime', 'false');
      } else {
        setIsFirstTime(false);
      }

      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <RecipeProvider>
          <FavoriteRecipesProvider>
            <Stack.Navigator>
              <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="NoDrawerStack" component={NoDrawerStackNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen} options={{headerShown: false}} />
              <Stack.Screen name="ReviewPage" component={ReviewPage} options={{headerShown: false}} />
            </Stack.Navigator>
          </FavoriteRecipesProvider>
        </RecipeProvider>
      ) : (
        <AuthNavigator isFirstTime={isFirstTime} />
      )}
    </NavigationContainer>
  );
}


// // App.js
// import React, { useContext, useState, useEffect, useCallback } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import { FavoriteRecipesProvider } from './contexts/BookmarkContext';
// import { Ionicons } from '@expo/vector-icons';
// import HomeScreen from './screens/HomeScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import YourMenusPage from './screens/YourMenusScreen';
// import DietaryRestrictionsPage from './screens/DietaryRestrictionsScreen';
// import RecipeBoxScreen from './screens/RecipeBoxScreen';
// import NewRecipeScreen from './screens/NewRecipeScreen';
// import GroceryListScreen from './screens/GroceryListScreen';
// import ReviewPage from './screens/ReviewPage';
// import SignInScreen from '../RecipeApp/(auth)/sign-in';
// import { Button, View} from 'react-native';
// import SearchScreen from './screens/SearchScreen';
// import RecipeDetailScreen from './screens/RecipeDetailScreen';
// import { AuthContext, AuthProvider } from './contexts/AuthContext';
// import { RecipeProvider } from './contexts/RecipeContext';
// import { checkAuth, signOutUser } from './utils/auth';
// import StepOne from './(auth)/sign-up/StepOne';
// import StepTwo from './(auth)/sign-up/StepTwo';
// import StepThree from './(auth)/sign-up/StepThree';
// import StepFour from './(auth)/sign-up/StepFour';
// import OnboardingStepOne from './screens/OnboardingScreen/IntroductionScreen';
// import OnboardingStepTwo from './screens/OnboardingScreen/ServingSizeSelectionScreen';
// import OnboardingStepThree from './screens/OnboardingScreen/RadioSelectionScreen';
// import OnboardingStepFour from './screens/OnboardingScreen/DietaryRestrictionsScreen';
// import OnboardingStepFive from './screens/OnboardingScreen/AllergiesScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import WelcomeScreen from './(auth)/sign-up/StepZero';
// import { useFonts } from 'expo-font';
// import FontLoader from './utils/FontLoader';
// import Onboarding from './screens/Onboarding';
// import AuthNavigator from './navigation/AuthNavigator';

// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();




// // Navigator for the Drawer
// const DrawerNavigator = React.memo(() => (
//   <Drawer.Navigator initialRouteName="Home">
//     <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
//     <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//     <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
//     <Drawer.Screen name="Your Menus" component={YourMenusPage} options={{ headerShown: false }} />
//     <Drawer.Screen name="Dietary Restrictions" component={DietaryRestrictionsPage} options={{ headerShown: false }} />
//     <Drawer.Screen name="Logout" component={Logout} />
//   </Drawer.Navigator>
// ));

// //Navigator for the Tabs
// const TabNavigator = React.memo(() => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ color, size }) => {
//         let iconName;
//         switch (route.name) {
//           case 'Home':
//             iconName = 'home-outline';
//             break;
//           case 'Recipe Box':
//             iconName = 'book-outline';
//             break;
//           case 'New Recipe':
//             iconName = 'add-circle-outline';
//             break;
//           case 'Search':
//             iconName = 'search-outline';
//             break;
//           case 'Grocery List':
//             iconName = 'basket-outline';
//             break;
//         }
//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#ff6347',
//       tabBarInactiveTintColor: 'gray',
//     })}
//   >
//     <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="Recipe Box" component={RecipeBoxScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="New Recipe" component={NewRecipeScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="Grocery List" component={GroceryListScreen} options={{ headerShown: false }} />
//   </Tab.Navigator>
// ));

// // Logout Component
// const Logout = ({ navigation }) => {
//   const handleLogout = async () => {
//     try {
//       await signOutUser();
//       alert('Logged out Successfully');
//       navigation.replace('SignIn');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// // Main App Component
// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isFirstTime, setIsFirstTime] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const firstTime = await AsyncStorage.getItem('isFirstTime');
//       setIsFirstTime(firstTime === null);

//       if (firstTime === null) {
//         await AsyncStorage.setItem('isFirstTime', 'false');
//       }

//       const authStatus = await checkAuth();
//       setIsAuthenticated(authStatus);
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   if (loading) {
//     return null; // You can add a loading or splash screen here
//   }

//   return (
//     <RecipeProvider>
//       <FavoriteRecipesProvider>
//         <NavigationContainer>
//           {isAuthenticated ? (
//             <Stack.Navigator>
//               <Stack.Screen
//                 name="Drawer"
//                 component={DrawerNavigator}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="NoDrawerStack"
//                 component={TabNavigator}
//                 options={{ headerShown: false }}
//               />
//             </Stack.Navigator>
//           ) : (
//             <AuthNavigator isFirstTime={isFirstTime} />
//           )}
//         </NavigationContainer>
//       </FavoriteRecipesProvider>
//     </RecipeProvider>
//   );
// }

// export function SignUp() {
//   return (
//         <Stack.Navigator
//            screenOptions={{
//             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Customize sliding animation
//         }} 
//           initialRouteName="Welcome"
//           >
//           <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
//           <Stack.Screen name="StepOne" component={StepOne} options={{ headerShown: false}}/>
//           <Stack.Screen name="StepTwo" component={StepTwo} options={{ headerShown: false}} />
//           <Stack.Screen name="StepThree" component={StepThree} options={{ headerShown: false}} />
//           <Stack.Screen name="StepFour" component={StepFour} options={{ headerShown: false}} />
//         </Stack.Navigator>
//   )
// };

// export function Onboard() {
//   return (
//         <Stack.Navigator 
//           screenOptions={{
//             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//           }}
//           initialRouteName="SignUp">
//                 {/* <Stack.Screen name="OnboardingStepOne" component={OnboardingStepOne} options={{ title: 'Welcome' }} />
//                 <Stack.Screen name="OnboardingStepTwo" component={OnboardingStepTwo} options={{ title: 'Serving Size' }} />
//                 <Stack.Screen name="OnboardingStepThree" component={OnboardingStepThree} options={{ title: 'Options' }} />
//                 <Stack.Screen name="OnboardingStepFour" component={OnboardingStepFour} options={{ title: 'Dietary Restrictions' }} />
//                 <Stack.Screen name="OnboardingStepFive" component={OnboardingStepFive} options={{ title: 'Food Allergies' }} /> */}
//                 <Stack.Screen name="OnboardPage" component={Onboarding} options={{ headerShown: false }} />
//                 <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
//             </Stack.Navigator>
//   )
// }

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//   screenOptions={({ route }) => ({
//     tabBarIcon: ({ color, size }) =>{
//       let iconName;
//       if (route.name === 'Recipe Box') {
//         iconName = 'book-outline';
//       } else if (route.name === 'New Recipe') {
//         iconName = 'add-circle-outline';
//       } else if (route.name === 'Grocery List') {
//         iconName = 'basket-outline';
//       } else if (route.name === 'Home') {
//         iconName = 'home-outline';
//     } else if (route.name === 'Search') {
//         iconName = 'search-outline';
//     }
//       return <Ionicons name={iconName} size={size} color={color} />;
//     },
//     tabBarActiveTintColor: '#ff6347',
//     tabBarInactiveTintColor: 'gray',
//   })}>
//       <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
//       <Tab.Screen name="Recipe Box" component={RecipeBoxScreen} options={{ headerShown: false}}/>
//       <Tab.Screen name="New Recipe" component={NewRecipeScreen} options={{ headerShown: false}}/>
//       <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false}}/>
//       <Tab.Screen name="Grocery List" component={GroceryListScreen} options={{ headerShown: false}}/>
//     </Tab.Navigator>
//   );
// }

// const Logout = ({navigation}) => {
//   const handleLogout = async () => {
//     try{
//       await signOutUser();
//       setIsAuthenticated(false);
//       alert('Logged out Successfully');
//       navigation.replace('SignIn');
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//    };

//    return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//     );
//  };

//  function NoDrawerStackNavigator() {
//     return ( 
//       <Stack.Navigator>
//         <Stack.Screen name="Details" component={RecipeDetailScreen} options={{ gestureEnabled: false, headerShown: false }} />
//         <Stack.Screen name="ReviewPage" component={ReviewPage} options={{ gestureEnabled: false, headerShown: false }} />
//         {/* <Stack.Screen name="LoginPage" component={LoginPage} options={{ gestureEnabled: false, headerShown: false }} />
//         <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ gestureEnabled: false, headerShown: false }} /> */}
//         <Stack.Screen name="NewRecipe" component={NewRecipeScreen} options={{ gestureEnabled: false, headerShown: false }} />
//       </Stack.Navigator>
//     );
//   }

//  function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName='Home'>
//       <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false}}/>
//       <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
//       <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false}}/>
//       <Drawer.Screen name="Your Menus" component={YourMenusPage} options={{ headerShown: false}}/>
//       <Drawer.Screen name="Dietary Restrictions" component={DietaryRestrictionsPage} options={{ headerShown: false}} />
//       <Drawer.Screen name="Logout" component={Logout} />
//     </Drawer.Navigator>
//    );
//  }
 
//  const AuthNavigator = () => (
//   <Stack.Navigator initialRouteName={isFirstTime ? "SignUp" : "SignIn"}>
//     <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false}} />
//     <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false}}/>
//     <Stack.Screen name='Onboard' component={Onboard} options={{ headerShown: false}}/>
//   </Stack.Navigator>
// );

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated ] = useState(false);
//   const [loading, setLoading ] = useState(true);
//   const [isFirstTime, setIsFirstTime] = useState(true);


//   useEffect(() => {
//     const initializeAuth = async () => {
//       const firstTime = await AsyncStorage.getItem('isFirstTime');
//       if (firstTime === null) {
//         setIsFirstTime(true);
//         await AsyncStorage.setItem('isFirstTime', 'false');
//       } else {
//         setIsFirstTime(false);
//       }

//       const authStatus = await checkAuth();
//       setIsAuthenticated(authStatus);
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   if (loading){
//     return null;
//   }



//   return (
 
//     <NavigationContainer>
//       {isAuthenticated ? (
      
//       <RecipeProvider>
//       <FavoriteRecipesProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//                   {/* Main Drawer Navigator */}
//                   <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

//                   {/* Screens Without Drawer Access */}
//                   <Stack.Screen name="NoDrawerStack" component={NoDrawerStackNavigator} options={{ headerShown: false }} />
//               </Stack.Navigator>
//       </NavigationContainer>
//       </FavoriteRecipesProvider>
//       </RecipeProvider>
//     ) : (
//       <AuthNavigator isFirstTime={isFirstTime}/>
//     )}
//     </NavigationContainer>
    
  //   <RecipeProvider>
  //   <FavoriteRecipesProvider>
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //               {/* Main Drawer Navigator */}
  //               <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />

  //               {/* Screens Without Drawer Access */}
  //               <Stack.Screen name="NoDrawerStack" component={NoDrawerStackNavigator} options={{ headerShown: false }} />
  //           </Stack.Navigator>
  //   </NavigationContainer>
  //   </FavoriteRecipesProvider>
  //   </RecipeProvider>
