import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, ScrollView, Button, } from 'react-native';
import { useFavorite } from '../contexts/BookmarkContext';
import SmallRecipeCard from '../components/SmallRecipeCard';
import MediumRecipeCard from '../components/MediumRecipeCard';
import LargeRecipeCard from '../components/LargeRecipeCard';
import Header from '../components/LoggedInHeader';

// calls upon recipes locally stored
import { useRecipes } from '../contexts/RecipeContext';

// calls upon recipes stored in the backend
import { getAllRecipes } from '../utils/RecipeCaller';

const DEBUG_MODE = true;
const screenWidth = Dimensions.get('window').width;

const RecipeBoxScreen = ({navigation}) => {
    const { favoriteRecipes } = useFavorite();
    const { recipes: localRecipes } = useRecipes();
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({ mealType: [], cuisine: [], dietaryPreferences: [] });
    const [modalFilters, setModalFilters] = useState({ mealType: [], cuisine: [], dietaryPreferences: [] });
    const [mainModalVisible, setMainModalVisible] = useState(false);
    const [filterOptions, setFilterOptions] = useState({ mealTypes: [], cuisines: [], dietaryPreferences: [] });
    const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

    // useEffect(() => {
    //     const fetchRecipes = async () => {
    //         if (DEBUG_MODE) {
    //             // Use the hardcoded recipes for favorite matching
    //             const favoriteLocalRecipes = localRecipes.filter(recipe =>
    //                 favoriteRecipes.some(fav => fav.id === recipe.id)
    //             );
    //             setRecipes(favoriteLocalRecipes);
    //         } else {
    //             // Fetch the favorite recipes from backend
    //             try {
    //                 const backendRecipes = await getAllRecipes();
    //                 const favoriteBackendRecipes = backendRecipes.filter(recipe =>
    //                     favoriteRecipes.some(fav => fav.$id === recipe.$id)
    //                 );
    //                 setRecipes(favoriteBackendRecipes);
    //             } catch (error) {
    //                 console.error('Error fetching backend recipes:', error);
    //             }
    //         }
    //     };
    //     fetchRecipes();
    // }, [favoriteRecipes, localRecipes]);

    useEffect(() => {
        setFilteredRecipes(favoriteRecipes);
    }, [favoriteRecipes]);


    // Filtering logic
    const handleSearch = (query) => {
        setSearchQuery(query);
        filterRecipes(query, selectedFilters, modalFilters);
    };

    const filterRecipes = (query, selectedFilters, modalFilters) => {
        const filtered = recipes.filter((recipe) => {
            const matchesSearchQuery = recipe.title.toLowerCase().includes(query.toLowerCase());
            const matchesMealType = selectedFilters.mealType.length === 0 || selectedFilters.mealType.includes(recipe.mealType);
            const matchesCuisine = selectedFilters.cuisine.length === 0 || selectedFilters.cuisine.includes(recipe.cuisine);
            const matchesDietaryPreferences = selectedFilters.dietaryPreferences.length === 0 || selectedFilters.dietaryPreferences.some(pref => recipe.dietaryPreferences.includes(pref));
            return matchesSearchQuery && matchesMealType && matchesCuisine && matchesDietaryPreferences;
        });
        setRecipes(filtered);
    };

    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = prevFilters[filterName].includes(value)
                ? prevFilters[filterName].filter((item) => item !== value)
                : [...prevFilters[filterName], value];

            filterRecipes(searchQuery, { ...selectedFilters, [filterName]: updatedFilters }, modalFilters);
            return { ...selectedFilters, [filterName]: updatedFilters };
        });
    };

    const cardWidth = (screenWidth - 40) / 3;

    return (
        <SafeAreaView>            
            <Header title="Recipe Box" isMenu={true} />

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search saved recipes..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => handleSearch(searchQuery)}
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setMainModalVisible(true)}
                >
                    <Text style={styles.filterButtonText}>Filters</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollContainer}>
                {filterOptions.mealTypes.map((mealType) => (
                    <TouchableOpacity
                        key={mealType}
                        onPress={() => handleFilterChange('mealType', mealType)}
                        style={[styles.filterButtonRound, selectedFilters.mealType.includes(mealType) && styles.selectedFilterRound]}
                    >
                        <Text style={styles.filterButtonTextRound}>{mealType}</Text>
                    </TouchableOpacity>
                ))}
                {filterOptions.cuisines.map((cuisine) => (
                    <TouchableOpacity
                        key={cuisine}
                        onPress={() => handleFilterChange('cuisine', cuisine)}
                        style={[styles.filterButtonRound, selectedFilters.cuisine.includes(cuisine) && styles.selectedFilterRound]}
                    >
                        <Text style={styles.filterButtonTextRound}>{cuisine}</Text>
                    </TouchableOpacity>
                ))}
                {filterOptions.dietaryPreferences.map((preference) => (
                    <TouchableOpacity
                        key={preference}
                        onPress={() => handleFilterChange('dietaryPreferences', preference)}
                        style={[styles.filterButtonRound, selectedFilters.dietaryPreferences.includes(preference) && styles.selectedFilterRound]}
                    >
                        <Text style={styles.filterButtonTextRound}>{preference}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/*  Displays the saved recipes */}
            <View style={styles.container}>
                {recipes.length > 0 ? (
                    <FlatList
                        data={filteredRecipes}
                        keyExtractor={(item) => item.id || item.$id}
                        renderItem={({ item }) => (
                            <View style={[styles.cardContainer, { width: cardWidth }]}>
                                <SmallRecipeCard
                                    item={item}
                                    onPress={() => navigation.navigate('NoDrawerStack', { screen: 'Details', params: { recipe: item } })}
                                />
                            </View>
                        )}
                        numColumns={3}
                        contentContainerStyle={styles.flatListContainer}
                    />
                ) : (
                    <Text style={styles.emptyText}>No recipes in your box yet! Add some to your favorites!</Text>
                )}          
            </View>

            {/* Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={mainModalVisible}
                onRequestClose={() => setMainModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Filters</Text>
                        {/* Filters such as mealType, cuisine, dietaryPreferences */}
                        {/* Add buttons and filter options here */}
                        <Button title="Apply Filters" onPress={() => setMainModalVisible(false)} />
                        <Button title="Close" onPress={() => setMainModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 },
    searchBar: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginRight: 10 },
    filterButton: { backgroundColor: '#ff6347', padding: 10, borderRadius: 5 },
    filterButtonText: { color: '#fff', textAlign: 'center' },
    filterScrollContainer: { flexDirection: 'row', marginBottom: 10 },
    filterButtonRound: { backgroundColor: '#eee', borderRadius: 20, padding: 10, marginRight: 10 },
    selectedFilterRound: { backgroundColor: '#ff6347' },
    filterButtonTextRound: { color: '#333' },
 });

 export default RecipeBoxScreen;