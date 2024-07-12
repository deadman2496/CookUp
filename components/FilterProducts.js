import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState } from 'react';

const FilterProducts = () => {
    const [userInput, setUserInput] = useState("");

    const products = [
    {id: 1, name: "Breakfast",},
    {id: 2, name: "Lunch",},
    {id: 3, name: "Dinner",},
    {id: 4, name: "Dessert",},
    {id: 5, name: "Side dish",},
    {id: 6, name: "Snack",},
    {id: 7, name: "Drinks",},
    ];
    const filterData = (item) => {
        //if input is empty
        if(userInput === ""){
            return (
                <View className="flex-row justify-between items-center m-5 mx-4 px-10 py-4 rounded-md bg-primary-400">
                            <Text>{item.name}</Text>
                        </View>
            );
        }

        if(item.name.toLowerCase().includes(userInput.toLowerCase())){
            return (
                <View className="flex-row justify-between items-center m-5 mx-4 px-10 py-4 rounded-md bg-primary-400"> 
                    <Text>{item.name}</Text>
                </View>
            );
        }
    }
    return (
        <View>
            <SafeAreaView />
                <Text>FilterProducts</Text>
                <View className="border-System-300 border-2 divide-x-2 px-9 py-2 rounded-md mx-4">
                    <TextInput 
                        placeholder='Enter Value Here'
                        onChangeText={(text) => setUserInput(text)}
                    />
                </View>

                <FlatList 
                    data={products} 
                    renderItem={( {item, index }) => filterData(item)} />
        </View>
    );
};
export default FilterProducts;

const styles = StyleSheet.create({
    TextInputContainer: {
        borderColor: "orange",
        borderWidth: 2,
        paddingHorizontal: 36,
        paddingVertical: 8,
        borderRadius: 6,
        marginHorizontal: 16,
    },

    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        marginHorizontal: 16,
    }
})