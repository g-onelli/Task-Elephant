import React from 'react';

import { StyleSheet, View, Text,Button,Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Log from '../objects/Log';
import colorChoice from '../stylePages/Colors';
import loginStyle from '../stylePages/loginCSS';

export default function Welcome({navigation}){

  const getAllTasks = async() => {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var tasks = await AsyncStorage.getItem("Tasks");
      console.log("Previously saved tasks: " + tasks);
    }
    catch(error){
      console.log(error)
    }
  }

  const pressHandler = () => {
      navigation.navigate('EnergyDay');
  }
["taskLifetimes","createdSchedules","completedSchedules",
                    "numTasksInSchedule","deletedTasks","createdTasks","weeklyCreatedTasks"]
  const debugNav = async() => {
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
      for (var lifeTime in taskLifetimes){
        avgLifetime += parseInt(lifeTime);
      }

      avgLifetime = avgLifetime / taskLifetimes.length / 1000 / 60;  
    }

    var avgTasksScheduled = 0;
    if (numTasksInSchedule != null){
      for (var tasks in numTasksInSchedule){
        avgTasksScheduled += parseInt(tasks);
      }
      console.log(avgTasksScheduled + "/" + numTasksInSchedule.length);
      avgTasksScheduled = avgTasksScheduled / numTasksInSchedule.length;  
    }
    
    var avgWeeklyTasks = 0;
    if (weeklyCreatedTasks != null){
      for (var tasks in weeklyCreatedTasks){
        avgWeeklyTasks += parseInt(tasks);
      }

      avgWeeklyTasks = avgWeeklyTasks / weeklyCreatedTasks.length;  
    }
    
    alert("Avg. Task Lifetime: " + avgLifetime + "\n" +
          "Created Schedules: " + createdSchedules + "\n"+
          "Completed Schedules: " + completedSchedules + "\n" +
          "Avg. Tasks in a Schedule: " + avgTasksScheduled + "\n" +
          "Tasks Created: " + createdTasks + "\n" +
          "Tasks Deleted: " + deletedTasks + "\n" +
          "Avg. Tasks Created Weekly: " + avgWeeklyTasks
            );
  }

  const debug_CurrentTime = () => {
    var date = new Date(Date.now());
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
    

  console.log(debug_CurrentTime());
  getAllTasks();
  return (


      <View style = {loginStyle.container}>

          <Text style = {
              {
                  padding:10,
                  paddingBottom:0,
                  marginBottom:0,
                  fontSize:30
              }
          }>
              Welcome to
          </Text>
          <Image style={{width:200,height:200}} source={require('../assets/FinalLogo.png')}/>
          <Text style = {loginStyle.name}>
              Task Elephant
          </Text>
          <Button color='#73a2f3' title = 'debug' onPress = {debugNav} style = {loginStyle.button1}>
          </Button>
          <Text>{'\n'}</Text>
          <Button color='#73a2f3' title = 'Start!' onPress = {pressHandler} style = {loginStyle.button}>
          </Button>


          


      </View>
  )
}     



/*const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    name : {
        // padding: 70,
        marginBottom:180,
        fontSize:35,
    },

    button:{
        marginTop : 190,

        // position : 'absolute',
        // padding: 50,
        height:280
    },
    button1:{
        alignSelf: 'flex-end',
        marginTop : 200,
        //position : 'absolute',
        //padding: 50,
        //height:10,
        width:10,
        fontSize:10
    },

  });*/


// const styles = StyleSheet.create({
//     container : {
//         padding: 24
//     }
// });
