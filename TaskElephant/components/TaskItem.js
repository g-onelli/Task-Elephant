import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';


export default function TaskItem({item, pressHandler}){
    if (item.deadline == "NaN") deadlineText = time; 
    else deadlineText = Date.getMonth(item.deadline) + "/" + Date.getDay(item.deadline) + "/" + Date.getYear(item.deadline)
    return(
        <TouchableOpacity onPress = {() => pressHandler(item.key)}>
            <Text style = {styles.item}>{item.getTitle()}, {item.getEnergyCost()}, {item.getTimeCost()}, {item.deadline}, {item.getPriority()}</Text>
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