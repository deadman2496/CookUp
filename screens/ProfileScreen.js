// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import ProfileRecipes from '../components/ProfileRecipes';
// import { recipes } from '../constants/recipeindex';
// import { images } from '../constants';

// const ProfileScreen = ({ route, navigation }) => {
//   // Temporarily disable user data by hardcoding some static data
//   const user = {
//     avatar: images.myself, // Replace with any image URL or local image
//     username: 'cassandra.dpe',
//     link: 'instagram.link',
//     bio: 'NYC <—> Italia 🌱 Plant-based & ready to EAT!',
//     followers: '00',
//     following: '00'
//   };

//   const isOwnProfile = false; // Simulate viewing your own profile, set to false to simulate other profiles

//   // Use static recipes for testing
//   const recipes = [
//     { id: 1, title: 'Frutti di Bosco Protein Smoothie', rating: 4.6, image: images.smoothie },
//     { id: 2, title: 'Tropical Paradise Smoothie', rating: 4.5, image: images.smoothie },
//     // More placeholder recipes
//   ];

//   const onEditProfile = () => {
//     navigation.navigate('EditProfile');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Profile Header */}
//         <ProfileHeader user={user} isOwnProfile={isOwnProfile} onEditProfile={onEditProfile} />

//         {/* Tab and Filter sections */}
//         {isOwnProfile && (
//           <View style={styles.tabContainer}>
//             <TouchableOpacity>
//               <Text style={styles.activeTab}>Your Recipes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={styles.inactiveTab}>Saved Recipes</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View style={styles.filterContainer}>
//           <TouchableOpacity>
//             <Text style={styles.activeFilter}>most recent</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={styles.inactiveFilter}>highest rated</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Recipe Cards with static data */}
//         <FlatList
//           data={recipes} 
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.recipeCard}>
//               <Image source={{ uri: item.image }} style={styles.recipeImage} />
//               <Text style={styles.recipeTitle}>{item.title}</Text>
//               <Text style={styles.recipeRating}>{item.rating} ★</Text>
//             </View>
//           )}
//           numColumns={2}
//           contentContainerStyle={styles.recipeList}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f9f9f9',
//     },
//     tabContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       backgroundColor: '#f7f7f7',
//       paddingVertical: 10,
//     },
//     activeTab: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#333',
//     },
//     inactiveTab: {
//       fontSize: 16,
//       color: '#aaa',
//     },
//     filterContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       backgroundColor: '#fffbe5',
//       paddingVertical: 10,
//     },
//     activeFilter: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       color: '#000',
//     },
//     inactiveFilter: {
//       fontSize: 14,
//       color: '#aaa',
//     },
//   });


const ProfileScreen = ({ route, navigation }) => {
  const { userData, isOwnProfile } = route.params;
  const {activeTab, setActiveTab } = useState('yourRecipes');
  const [filter, setFilter] = useState('mostRecent');
  
  const filteredRecipes = () => {
    switch (filter) {
      case 'highestRated':
        return recipes.sort((a, b) => b.rating - a.rating);
      case 'lowestRated':
        return recipes.sort((a, b) => a.rating - b.rating);
      default:
        return recipes; // mostRecent
    }
  };

  const onEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const userRecipes = recipes.filter((recipe) => recipe.creator === user.username);
  const savedRecipes = recipes.filter((recipe) => recipe.savedBy && recipe.savedBy.includes(user.username));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader user={user} isOwnProfile={isOwnProfile} onEditProfile={onEditProfile} />
        
           {/* Tab Navigation for Own Profile */}
           {isOwnProfile && (
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('yourRecipes')}>
              <Text style={activeTab === 'yourRecipes' ? styles.activeTab : styles.inactiveTab}>Your Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('savedRecipes')}>
              <Text style={activeTab === 'savedRecipes' ? styles.activeTab : styles.inactiveTab}>Saved Recipes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Filters (Most Recent, Highest Rated, Lowest Rated) */}
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => setFilter('mostRecent')}>
            <Text style={filter === 'mostRecent' ? styles.activeFilter : styles.inactiveFilter}>most recent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('highestRated')}>
            <Text style={filter === 'highestRated' ? styles.activeFilter : styles.inactiveFilter}>highest rated</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('lowestRated')}>
            <Text style={filter === 'lowestRated' ? styles.activeFilter : styles.inactiveFilter}>lowest rated</Text>
          </TouchableOpacity>
        </View>

        {/* Recipe List (Your Recipes / Saved Recipes or Their Recipes) */}
        {isOwnProfile ? (
          activeTab === 'yourRecipes' ? (
            <ProfileRecipes recipes={filteredRecipes(userRecipes)} title="Your Recipes" />
          ) : (
            <ProfileRecipes recipes={filteredRecipes(savedRecipes)} title="Saved Recipes" />
          )
        ) : (
          <ProfileRecipes recipes={filteredRecipes(userRecipes)} title="Their Recipes" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#aaa',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fffbe5',
    paddingVertical: 10,
  },
  activeFilter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  inactiveFilter: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default ProfileScreen;
