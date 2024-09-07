import React,{ useState } from "react";
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const conversionTable = {
    teaspoon: {
        tablespoon: 0.3333,
        ounce: 0.1667,
        dash: 8,
        pinch: 16.92,
    },
    tablespoon: {
        teaspoon: 3,
        ounce: 0.5,
        cup: 0.0625,
    },
    cup: {
        tablespoon: 16,
        teaspoon: 48,
        ounce: 8,
        liter: 0.236588,
        milliliter: 236.588
    },
};

const convertUnits = (amount, fromUnit, toUnit) => {
    if (conversionTable[fromUnit] && conversionTable[fromUnit][toUnit]){
        return amount * conversionTable[fromUnit][toUnit];
    }
    return null;
};

const UnitConverter = ({defaultAmount, defaultFromUnit, defaultToUnit }) => {
    const [amount, setAmount ] = useState(defaultAmount || 0);
    const [fromUnit, setFromUnit ] = useState(defaultFromUnit ||'teaspoon');
    const [toUnit, setToUnit ] = useState(defaultToUnit ||'tablespoon');
    const [convertedAmount, setConvertedAmount ] = useState(null);

    const handleConvert = () => {
        const result = convertUnits(amount, fromUnit, toUnit);
        if (result) {
            setConvertedAmount(result.toFixed(2));
        } else {
            setConvertedAmount('Conversion not possible')
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(val) => setAmount(parseFloat(val))}
            />

            <RNPickerSelect
                onValueChange={(value) => setFromUnit(value)}
                items={[
                    { label: 'Teaspoon', value: 'teaspoon'},
                    { label: 'Tablespoon', value: 'tablespoon'},
                    { label: 'Cup', value: 'cup'},
                    { label: 'Ounce', value: 'ounce'},
                    { label: 'Dash', value: 'dash'},
                    { label: 'Pinch', value: 'pinch'},
                ]}
            />
            <RNPickerSelect
                onValueChange={(value) => setToUnit(value)}
                items={[
                    { label: 'Teaspoon', value: 'teaspoon'},
                    { label: 'Tablespoon', value: 'tablespoon'},
                    { label: 'Cup', value: 'cup'},
                    { label: 'Ounce', value: 'ounce'},
                    { label: 'Dash', value: 'dash'},
                    { label: 'Pinch', value: 'pinch'},
                ]}
            />

            <Button title="Convert" onPress={handleConvert} />
            {convertedAmount && <Text>Converted: {convertedAmount}</Text>}
        </View>
    );
};


const styles= StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
});

export default UnitConverter;