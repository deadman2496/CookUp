import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '../constants/conversionTable';
import {getGroceryItems, addGroceryItem } from '../lib/appwrite';

const GroceryListScreen = () => {
        const [amount, setAmount] = useState(0);
        const [fromUnit, setFromUnit] = useState('teaspoon');
        const [toUnit, setToUnit] = useState('tablespoon');
        const [convertedAmount, setConvertedAmount] = useState(null);
        const [modalVisible, setModalVisible ] = useState(false);
        const [groceryList, setGroceryList] = useState([]);
      


        const handleConvert = () => {
          const result = convertUnits(amount, fromUnit, toUnit);
          if (result) {
            setConvertedAmount(result.toFixed(2));
          } else {
            setConvertedAmount('Conversion not possible');
          }
        };

        useEffect(() => {
          const fetchGroceryItems = async () => {
          const items = await getGroceryItems();
          setGroceryList(items);
        };

        fetchGroceryItems();
        }, []);

        const condenseGroceryList = () => {
          const condensed = condenseList(groceryList);
          setGroceryList(condensed);
        };
      
        return (
          <SafeAreaView> 
            <View>
            <FlatList 
              data={groceryList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View>
                  <Text style={styles.IngredientLabel}>{item.name}</Text>
                  <Text style={styles.recipeLabel}>({item.recipe})</Text>
                </View>
              )}
            />
            <Button title="Condense Grocery List" onPress={condenseGroceryList} />
            </View>
            <Button title='Convert Units' onPress={() => setModalVisible(true)}/>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <UnitConverter />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
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
    text: {
        fontSize: 20,
    },
    IngredientLabel: {
      fontSize: 14,
      fontFamily: 'poppins-regular, arial',
    },
    recipeLabel: {
      fontSize: 12,
      fontFamily: 'poppins-regular, arial',
    }
});

export default GroceryListScreen;
