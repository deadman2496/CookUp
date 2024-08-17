import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';

const AddReviewPage = ({ route, navigation }) => {
    const { recipe, onAddReview } = route.params;

    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handlePublish = () => {
        if (username.trim() && reviewText.trim() && rating > 0) {
            const newReview = {
                userName: username,
                rating: rating,
                text: reviewText,
                profilePicture: null,
            };

            onAddReview(newReview);

            navigation.goBack();
        } else {
            Alert.alert('Error','Please fill out all fields and provide a rating.');
        }
     };

     return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>

            <TextInput
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.ratingText}>Rate this recipe:</Text>
            <Rating 
                type='star'
                ratingCount={5}
                imageSize={40}
                startingValue={rating}
                onFinishRating={setRating}
                style={styles.rating} 
            />

            <Text style={styles.label}>Write your review:</Text>
            <TextInput
                style={styles.textArea}
                multiline
                placeholder='Share your experience with others on this recipe. Remember to keep within the code of conduct.'
                value={reviewText}
                onChangeText={setReviewText} 
            />

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
        </ScrollView>
     );
 };

 const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
     },
     label: {
        fontSize: 18,
        marginBottom: 10,
     },
     rating: {
        marginBottom: 20,
     },
     textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
      },
      publishButton: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      publishButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
  });

  export default AddReviewPage;