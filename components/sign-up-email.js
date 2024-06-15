import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Last ( {formData, setFormData} ) {
    // name input
  //email:"",
  //password: "",
  //cpassword: "",
  // PersonalDetails
  //age: "",
  //designation: "",
  //company: "",

  //Extras
  //hobbies:"",
  //activities: "",
  return (
    <>
    <View style={styles.inputView}>
        <TextInput 
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder="How old are you" 
            value={formData.age}
            onChangeText={(age)=> {
                setFormData({... formData, age});
            }}
        />
    </View>
    <View className="rounded-3xl w-[170px] h-[45px] mb-20 items-center justify-center border-primary-100 border">
        <TextInput 
            //style={styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder="What is your occupation" 
            value={formData.designation}
            onChangeText={(designation)=> {
                setFormData({... formData, designation});
            }}
        />
    </View>
    <View style={styles.inputView}>
        <TextInput 
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder="Company" 
            value={formData.company}
            onChangeText={(company)=> {
                setFormData({... formData, company});
            }}
        />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#ffc0cb",
        borderRadius: 30,
        width: 170,
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    }
});
