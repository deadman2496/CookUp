import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MultipleSelectList} from 'react-native-dropdown-select-list';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import FilterProducts from '../../components/FilterProducts';
import { icons } from '../../constants';
import Categories from '../../components/categories';
import Trending from '../../components/Trending';
import { getLatestPosts, getAllPosts } from '../../lib/appwrite';
import Recipes from '../../components/recipes';
import { useGlobalContext } from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppwrite';
import { StatusBar } from 'expo-status-bar';

const Search = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true); 
    // re-call videos -> checks for any new videos
    await refetch();
    setRefreshing(false);
  }

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, [])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }
  const getCategories = async () =>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/categories.php');
      //console.log('got categories: ', response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch (err){
      console.log('error :', err.message);
    }
  }
  const getRecipes = async (category="Beef") => {
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v2/9973533/filter.php?c=${category}`);
      //console.log('error: ', error.message);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error:', err.message);
    }
  }
  return (
      <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14"
      >
        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
              <TextInput
                placeholder='Search a recipe'
                placeholderTextColor={'gray'}
                className="flex-1 text-xl mb-1 pl-3 tracking-wider"
              />
              <View className="bg-primary-300 rounded-full p-3">
                <Image 
                  source={icons.search}
                  className="w-7 h-7"
                />
              </View>
             </View>

        {/* categories */}
        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})