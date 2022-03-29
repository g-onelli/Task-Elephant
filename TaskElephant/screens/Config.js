import React, { useState } from 'react';

import {AppRegistry, StyleSheet, View, Text,Button, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Log from '../objects/Log';
import {Slider} from '@miblanchard/react-native-slider';
import ConfigStore from '../objects/ConfigStore';
import {NavigationEvents} from 'react-navigation';
import CustomButton from '../components/customButton';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class Config extends React.Component{

  state = {
    config_temp:0,
    dayStart:"9",
    dayEnd:"22"
  }


  debugNav = async() => {
//  "Need to later create some cleaner method of initalizing this..."
    var taskLifetimes = await Log.getLogJSON("taskLifetimes");
    console.log("taskLifetimes|" + taskLifetimes);
    var createdSchedules = await Log.getLog("createdSchedules");
    console.log("createdSchedules|" + createdSchedules);
    var completedSchedules = await Log.getLog("completedSchedules");
    console.log("completedSchedules|" + completedSchedules);
    var numTasksInSchedule = await Log.getLogJSON("numTasksInSchedule");
    console.log("numTasksInSchedule|" + numTasksInSchedule);
    var deletedTasks = await Log.getLog("deletedTasks");
    console.log("deletedTasks|" + deletedTasks);
    var createdTasks = await Log.getLog("createdTasks");
    console.log("createdTasks|" + createdTasks);
    var weeklyCreatedTasks = await Log.getLogJSON("weeklyCreatedTasks");
    console.log("weeklyCreatedTasks|" + weeklyCreatedTasks);

    var avgLifetime = 0;
    if (taskLifetimes != null){
      for (var lifeTime of taskLifetimes){
        avgLifetime += parseInt(lifeTime);
      }

      avgLifetime = avgLifetime / taskLifetimes.length / 1000 / 60;  
    }

    var avgTasksScheduled = 0;
    if (numTasksInSchedule != null){
      for (var tasks of numTasksInSchedule){
        avgTasksScheduled += parseInt(tasks);
      }
      console.log(avgTasksScheduled + "/" + numTasksInSchedule.length);
      avgTasksScheduled = avgTasksScheduled / numTasksInSchedule.length;  
    }
    
    var avgWeeklyTasks = 0;
    if (weeklyCreatedTasks != null){
      for (var tasks of weeklyCreatedTasks){
        avgWeeklyTasks += parseInt(tasks);
      }

      avgWeeklyTasks = avgWeeklyTasks / weeklyCreatedTasks.length;  
    }
    
    alert("Avg. Task Lifetime: " + avgLifetime.toFixed(2) + "\n" +
          "Created Schedules: " + createdSchedules + "\n"+
          "Completed Schedules: " + completedSchedules + "\n" +
          "Avg. Tasks in a Schedule: " + avgTasksScheduled.toFixed(2) + "\n" +
          "Tasks Created: " + createdTasks + "\n" +
          "Tasks Deleted: " + deletedTasks + "\n" +
          "Avg. Tasks Created Weekly: " + avgWeeklyTasks.toFixed(2) + "\n"
            );
  }

  debug_CurrentTime = () => {
    var date = new Date(Date.now());
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }

  saveConfigs = async() => {
    var startDay = this.state.dayStart
    var endDay = this.state.dayEnd

    if (startDay == null || isNaN(parseInt(startDay))){
      alert("Error: DayStart not a valid config value.")
      return;
    }
    if (endDay == null || isNaN(parseInt(endDay))){
      alert("Error: Day End not a valid config value.")
      return;
    }
    startDay = parseInt(startDay)
    endDay = parseInt(endDay)
    if (startDay < 0 || startDay > 23){
      alert("Error: Day Start not in valid range. [0-23]")
      return; 
    }
    if (endDay < 0 || endDay > 23){
      alert("Error: Day End not in valid range. [0-23]")
      return; 
    }
    if (startDay > endDay){
      alert("Error: Day End is before Day Start.")
      return;
    }

    await ConfigStore.saveConfig(this.state.dayStart,"startDay");
    await ConfigStore.saveConfig(this.state.dayEnd,"endDay");
    alert("Configuration Saved");
    return;
  }

  async componentDidMount(){
    this.setState({dayStart:await ConfigStore.getConfig("startDay")});
    this.setState({dayEnd:await ConfigStore.getConfig("endDay")});

  }



  render() {

    return (
      <View style = {styles.container}>
          <NavigationEvents onDidFocus={async () => await this.componentDidMount()} />

          <View style ={styles.config_entry}>
          <View style ={styles.config_entry_main}>
            <Text/>
          </View>
          <Text style = {[styles.text_sub, {marginLeft:5, textAlign:"center"}]}>
            If you have any feedback or bug reports, 
            feel free to reach out to us at TaskElephantGroup@gmail.com 
          </Text>
          </View>

          <View style ={styles.config_entry}>
          <View style ={styles.config_entry_main}>
            <Text style = {styles.text}>
              Day Start
            </Text>
            <TextInput placeholder = "0-24" style = {[styles.textInput,{width:55}]} 
              value = {this.state.dayStart} onChangeText = {(text) => this.setState({dayStart:text})}/>
          </View>
          <Text style = {styles.text_sub}>
            The start of your day, when the app will ask you for the energy you
             have and the earliest tasks will be scheduled.
          </Text>
          </View>
          
          <View style = {styles.config_entry}>
          <View style ={styles.config_entry_main}>
            <Text style = {styles.text}>
              {'Day End'} 
            </Text>
            <TextInput placeholder = "0-24" style = {[styles.textInput,{width:55}]} 
              value = {this.state.dayEnd} onChangeText = {text => this.setState({dayEnd:text})}/>
          </View>
          <Text style = {styles.text_sub}>
            The end of your day, when the app will not schedule tasks.
          </Text>
          </View>
          
          <View style = {styles.container_button}>
            <TouchableOpacity onPress = {this.debugNav} style = {styles.button}>
              <Text style = {styles.button_text}>
                Debug
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {this.saveConfigs} style = {styles.button}>
              <Text style = {styles.button_text}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          


      </View>
  )
        

}}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rgba(115,162,243,.3)',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    config_entry_main: {
      display: 'flex',
      alignItems:'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%'/*Platform.OS === 'ios' ? 400: 375*/,
//      borderBottomWidth: 1,
//      borderBottomColor: '#AEAEAE'
    },
    config_entry: {
      display: 'flex',
      alignItems:'flex-start',
      flexDirection: 'column',
      width: '100%'/*Platform.OS === 'ios' ? 400: 375*/,
      borderBottomWidth: 1,
      borderBottomColor: '#AEAEAE',
      backgroundColor:'#fff'

    },
    name : {
        // padding: 70,
        marginBottom:180,
        fontSize:35,
    },
    text:{
        fontSize: 22,
        padding:10,
        margin:10,
        marginLeft:10,
//        width: Platform.OS === 'ios' ? 400 : 375
    },
    text_sub:{
        fontSize: 16,
        padding:0,
        paddingBottom:10,
        marginTop:-10,
        marginLeft:30,
        color: '#4D4D4D',
//        width: Platform.OS === 'ios' ? 400 : 375
    },
    textInput:{
      fontSize:22,
      padding:10,
      paddingBottom:0,
      margin:10,
      borderBottomWidth:1,
      borderBottomColor: '#36454F',
    },

    container_button:{
      flex:1,
      alignItems:'flex-end',
      justifyContent:'space-between',
      flexDirection:'row',
      paddingBottom:20,
      paddingLeft:10,
      paddingRight:10,
      width: '100%'
    },
    button_text:{
      fontSize: 18,
      margin:10
//    width: Platform.OS === 'ios' ? 400 : 375
    },
    button:{
        
        backgroundColor:"#FFFFFF",
        // position : 'absolute',
        // padding: 50,
        margin:10,
        borderRadius:10,
        borderWidth:1
    },


  });


// const styles = StyleSheet.create({
//     container : {
//         padding: 24
//     }
// });