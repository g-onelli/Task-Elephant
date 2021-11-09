import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../Task';
import TaskStore from '../TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import { HeaderTitle } from 'react-navigation-stack';



class ShowSingleTask extends React.Component{

    initTask(title,energy,time,deadline,priority){
        //  "Basic Input sanitiation, if field does not match expected value throw an alert and return."
       if (energy < 0 || energy > 100 || isNaN(parseInt(energy))){
         alert("Error: " + energy + " not a valid energy cost value. [0 - 100]");
         return;
       }
   
   //  "Time cost value must be limited, or we'll run into issues regarding 
   //    time cost values too large to fit in a schedule, or possibly even a day.  "
       if (time < 0 || time > 180 || isNaN(parseInt(time))){
         alert("Error: " + energy + " not a valid time cost value. [0 - 180]");
         return;
       }
   
       if (deadline != "NaN" && deadline < Date.now()){
         alert("Error: Deadline is set before present time.")
         return;
       }
   
       if (isNaN(parseInt(deadline)) && deadline != "NaN"){
         alert("Error: " + deadline + " not a valid date.");
       }
   
       if (deadline == "NaN") priority += 1;
   //  "Until a Date picker is implemented, this will be set to a 'default' deadline 1 week away."  
       else date = Date.now + 1000 * 60 * 60 * 24 * 7
       console.log("TimeCost: " + time);
   //  "Time Cost should be a positive integer of minutes."    
       time *=  1000 * 60;
       return new Task(title,energy,time,deadline,priority);
      }
    


    render(){
        return (
            
            <View style={styles.container}>
                <Text style = {styles.text}>Title: {this.props.navigation.getParam('title')}</Text>
                <Text style = {styles.text}>Energy Cost: {this.props.navigation.getParam('energyCost')}</Text>
                <Text style = {styles.text}>Time Cost: {this.props.navigation.getParam('timeCost')}</Text>
                <Text style = {styles.text}>Deadline: {this.props.navigation.getParam('deadline')}</Text>
                <Text style = {styles.text}>Base Priority: {this.props.navigation.getParam('basePriority')}</Text>
                <Text style = {styles.text}>Start Date: {this.props.navigation.getParam('startDate')}</Text>
                
                <View style = {styles.ButtonView}>
                    <Button color = '#FE4643'onPress={() => {
                        console.log("Deleting task");
                        TaskStore.removeTask(new Task(
                        this.props.navigation.getParam('title'),
                        this.props.navigation.getParam('energyCost'),
                        this.props.navigation.getParam('timeCost'),
                        this.props.navigation.getParam('deadline'),
                        this.props.navigation.getParam('basePriority')));
                    this.props.navigation.navigate('Show');

                }} 
                        title= 'Delete'>
                    </Button>
                </View>
            </View>
        )
    }
}

export default ShowSingleTask;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      text:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        width:400
      },

      ButtonView: {
          marginTop:120
      }
})