import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnitConverter from '../constants/conversionTable';

const GroceryListScreen = () => {
        const [amount, setAmount] = useState(0);
        const [fromUnit, setFromUnit] = useState('teaspoon');
        const [toUnit, setToUnit] = useState('tablespoon');
        const [convertedAmount, setConvertedAmount] = useState(null);
        const [modalVisible, setModalVisible ] = useState(false);
      


        const handleConvert = () => {
          const result = convertUnits(amount, fromUnit, toUnit);
          if (result) {
            setConvertedAmount(result.toFixed(2));
          } else {
            setConvertedAmount('Conversion not possible');
          }
        };
      
        return (
          <SafeAreaView> 
            <Button title='Convert Units' onPress={() => setModalVisible(true)}/>

            <Modal
                animationType="slide"
                transparent={true}
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
});

export default GroceryListScreen;
