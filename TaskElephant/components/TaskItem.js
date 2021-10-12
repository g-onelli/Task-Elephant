import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';


export default function TaskItem({item, pressHandler}){

    return(
        <TouchableOpacity onPress = {() => pressHandler(item.key)}>
            <Text style = {styles.item}>{item.title}, {item.energyCost}, {item.timeCost}, {item.deadline}, {item.priority}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    item:{
        padding:16,
        marginTop:10,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10
      }
})