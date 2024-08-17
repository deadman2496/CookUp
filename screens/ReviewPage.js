import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import { Rating } from 'react-native-ratings';

const ReviewPage = ({ route }) => { 
    const { reviews } = route.params;

    const renderReview = ({ item }) => ( 
        <View style={styles.reviewContainer}>
            <View style={styles.leftContainer}>
            <Text style={styles.userName}>{item.userName}</Text>
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
    reviewContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
     },
     leftContainer: { 
        width: 100,
        alignItems: 'center',
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