import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';

const ReviewPage = ({ route, navigation }) => { 
    const { reviews, recipe } = route.params;

    const handleAddToMenu = () => { 
        // Add to Menu functionality
        alert('Added to Menu');
    };

    const renderReview = ({ item }) => ( 
        <View style={styles.reviewContainer}>
            <View style={styles.leftContainer}>
                <View style={styles.userInfoContainer}>
            {item.profilePicture ? (
                <Image source={item.profilePicture} style={styles.profilePicture} />
            ): (
                <Ionicons name='person-circle-outline' size={20} color='grey' style={styles.profilePicture} />
            )}
            <Text style={styles.userName}>{item.userName}</Text>
                </View>
            <Rating 
                type='star'
                ratingCount={5}
                imageSize={12}
                startingValue={item.rating}
                readonly
                style={styles.rating}
            />
            <View style={styles.thumbsContainer}>
                <Ionicons name='thumbs-up-outline' size={16} color='grey' />
                <Ionicons name='thumbs-down-outline' size={16} color='grey' />
            </View>
            </View>
            <View style={styles.rightContainer}>
            <Text style={styles.reviewText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            
            {/* Recipe Image at the top */}
            <Image source={recipe.image} style={styles.image} />

            {/* Review Count, Star Rating, and Total Reviews */}
            <View style={styles.reviewSummary}>
                <Text style={styles.ratingValue}>{recipe.rating.toFixed(1)}</Text>
                <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={20}
                    startingValue={recipe.rating}
                    readonly
                    style={styles.rating}
                    ratingContainerStyle={{ backgroundColor: 'transparent' }}
                />
                <Text style={styles.reviewCount}>({recipe.reviewCount})</Text>

                <TouchableOpacity style={styles.addToMenuButton} onPress={handleAddToMenu}>
                    <Text style={styles.ratingCount}> + Add to Menu</Text>
                </TouchableOpacity>
            </View>

            
            <FlatList 
                data={reviews}
                renderItem={renderReview}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.reviewList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },
    reviewSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
     },
     ratingValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
     },
     rating: {
        marginHorizontal: 10,
      },
    reviewCount: {
        fontSize: 16,
        color: '#666',
        marginLeft: 10,
    },
    addToMenuButton: { 
        backgroundColor: '#ff6347',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },

    reviewContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
     },
     userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
     }, 
     leftContainer: { 
        width: 100,
        alignItems: 'center',
     },
     profilePicture: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 5, 
    },
     userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
     },
    rating: {
        marginBottom: 5,
    },
    thumbsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
    },
    thumbsIcon: {
        marginHorizontal: 5,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    reviewText: {
        fontSize: 14,
        color: '#555',
    },
    reviewList: {
        paddingBottom: 20,
    },
 });

export default ReviewPage;