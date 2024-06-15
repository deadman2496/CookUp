import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MultipleSelectList} from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

  const [selected, setSelected ] = React.useState([]);

  const type = [
    {key:'1', value: 'Breakfast'},
    {key:'2', value: 'Lunch'},
    {key:'2', value: 'Dinner'},
    {key:'1', value: 'Dessert'},
    {key:'2', value: 'Side dish'},
    {key:'2', value: 'Snack'},
    {key:'2', value: 'Drinks'},
  ]
  const cuisine = [
    {key:'1', value: 'American'},
    {key:'2', value: 'Mexican'},
    {key:'3', value: 'Indian'},
    {key:'4', value: 'Thai'},
    {key:'5', value: 'Central American'},
    {key:'6', value: 'Italian'},
    {key:'7', value: 'Greek'},
    {key:'8', value: 'Chinese'},
    {key:'9', value: 'French'},
    {key:'10', value: 'Japanese'},
    {key:'11', value: 'Spanish'},
    {key:'12', value: 'Middle Eastern'},
    {key:'13', value: 'South American'},
    {key:'14', value: 'Indian'},
    {key:'0', value: 'add cuisine'}
  ]
  const diet = [
    {key:'1', value: 'Vegan'},
    {key:'2', value: 'Vegetarian'},
    {key:'3', value: 'Pescatarian'},
    {key:'4', value: 'plant based'},
    {key:'5', value: 'Gluten free'},
    {key:'6', value: 'nut free'},
    {key:'7', value: 'lactose intolerant'},
    {key:'8', value: 'low sodium'},
    {key:'9', value: 'paleo'},
    {key:'10', value: 'keto'},
    {key:'11', value: 'add dietary preference'},
  ]
  return (
    <ScrollView>
    <SafeAreaView>
      <MultipleSelectList 
        setSelected={(val) => setSelected(val)}
        data={type}
        label="Meal Type"
        onSelect={() => console.log(selected)}
        save="key"
      />
      <MultipleSelectList 
        setSelected={(val) => setSelected(val)}
        data={cuisine}
        label="Cuisine"
        onSelect={() => console.log(selected)}
        save="key"
      />
      <MultipleSelectList 
        setSelected={(val) => setSelected(val)}
        data={diet}
        label="Dietary Preferences"
        onSelect={() => console.log(selected)}
        save="key"
      />
    </SafeAreaView>
    </ScrollView>
  )
}

export default Search

const styles = StyleSheet.create({})