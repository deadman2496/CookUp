import { View, Text, ScrollView, FlatList, Image, RefreshControl, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { images, icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import Recipes from '../../components/recipes'
import Categories from '../../components/categories'
import axios from 'axios';
import Recipestrend from '../../components/recipestrend';
import Recipesnew from '../../components/recipesnew';

export default function Home() {
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

  const [latestMeal, setLatestMeal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Beef');

  useEffect(() => {
    getCategories();
    getRecipes();
    getLatestMeal();
    getRandomMeal();
  }, [])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getRandomMeal = async () =>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/randomselection.php');
      //console.log('got categories: ', response.data);
      if(response && response.data){
        setRandomMeal(response.data.meals);
      }
    }catch (err){
      console.log('error :', err.message);
    }
  }

  const getLatestMeal = async () =>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/latest.php');
      //console.log('got categories: ', response.data);
      if(response && response.data){
        setLatestMeal(response.data.meals);
      }
    }catch (err){
      console.log('error :', err.message);
    }
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
        {/* avatar and bell icon */}

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className="font-pmedium text-sm text-black-200">Hello,</Text> 

          <Text className="text-2xl font-semibold text-black-200">
                  {user?.username}
                </Text>
        </View>

        {/* recipes */}
        <View>
          <Recipestrend meals={meals} categories={categories}/>
          <Recipesnew meals={meals} categories={categories} /> 
          <Recipes meals={meals} categories={categories} />
        </View>


        {/* categories */}
        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>
      </ScrollView>
    </View>
  )
}