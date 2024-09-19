import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileHeader = ({ user, isOwnProfile, onEditProfile }) => (
    <View style={styles.profileHeader}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <Text style={styles.username}>{user.username}</Text>
    <Text style={styles.link}>{user.link}</Text>
    <Text style={styles.bio}>{user.bio}</Text>
    <View style={styles.followContainer}>
      <Text style={styles.followers}>{user.followers} followers</Text>
      <Text style={styles.following}>{user.following} following</Text>
    </View>
    {isOwnProfile ? (
      <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfile}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
    profileHeader: {
      alignItems: 'center',
      padding: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    link: {
      fontSize: 16,
      color: 'blue',
    },
    bio: {
      fontSize: 14,
      textAlign: 'center',
      marginVertical: 10,
    },
    followContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    followers: {
      fontSize: 16,
    },
    following: {
      fontSize: 16,
    },
    editProfileButton: {
      backgroundColor: '#ff6347',
      padding: 10,
      borderRadius: 5,
    },
    editProfileButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    followButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    followButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default ProfileHeader;