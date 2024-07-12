import { View, Text, Image} from 'react-native'
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{color: color }}>
        {name}
      </Text>
    </View>
  )
}

const  TabsLayout  = () => {
  return (
    <>
      <Tabs
       screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height:84,
        }
       }}
      >
        <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="recipeBox"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name="Recipe Box"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="recipe"
          options={{
            title: 'New Recipe',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.plus}
                color={color}
                name="New Recipe"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="search"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.search}
                color={color}
                name="Search"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.bag}
                color={color}
                name="Grocery List"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
                name='RecipeDetailScreen'
                options={{
                    title:"RecipeDetail",
                    headerShown: false,
                    href: null,
                }}
            />
        
      </Tabs>
      
    </>
  )
}

export default  TabsLayout 