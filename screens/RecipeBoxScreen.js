import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView} from 'react-native';
import { useFavorite } from '../contexts/BookmarkContext';
import SmallRecipeCard from '../components/SmallRecipeCard';
import MediumRecipeCard from '../components/MediumRecipeCard';
import LargeRecipeCard from '../components/LargeRecipeCard';
import Header from '../components/LoggedInHeader';

const screenWidth = Dimensions.get('window').width;

const RecipeBoxScreen = ({navigation}) => {
    const { favoriteRecipes } = useFavorite();

    const cardWidth = (screenWidth - 40) / 3;

    return (
        <SafeAreaView>            
            <Header title="Recipe Box" isMenu={true} />
            <View style={styles.container}>
                {favoriteRecipes.length > 0 ? (
                    <FlatList
                    data={favoriteRecipes}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={[styles.cardContainer, { width: cardWidth}]}>
                        <SmallRecipeCard
                        item={item}
                        onPress={() => navigation.navigate('NoDrawerStack',{screen:'Details', params: { recipe: item},})}
                        />
                        </View>
                    )}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainer}
                />    
                ) : (
                    <Text style={styles.emptyText}>No recipes in your box yet! Take a look at our app and start adding to your favorites!</Text>
                )}            
            </View>
        </SafeAreaView>
    );
 };

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer:{
        justifyContent: 'space-between'
    },
    cardContainer: {
        margin:5,
    },
    emptyText: {
        textAlign:'center',
        fontSize: 18,
        color: '#666',
        marginTop: 20,
    },
 });

 export default RecipeBoxScreen;