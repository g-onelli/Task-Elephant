import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../objects/Task';
import TaskStore from '../objects/TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import Schedule from '../objects/Schedule';
import ScheduleStore from '../objects/ScheduleStore';
import EventStore from '../objects/EventStore';
import ConfigStore from '../objects/ConfigStore';
import Log from '../objects/Log';
import FButton from '../components/fullScreenButton'; 
import scheduleSheet from '../styling/ScheduleDisplay';
import returnDate from '../objects/SwitchTime';


class ShowSchedule extends React.Component{
  state = {
    tasks:[],
    scheduleToday:[],
    // notSchedule:[]
  }


   sort(arr){
     let n = arr.length;
     for (let i =0; i< n-1; i++){
       for (let j = 0; j< n-i-1; j ++){
//      "Sort by largest priority"
         if (arr[j].getPriority()< arr[j+1].getPriority()){
           let temp = arr[j];
           arr[j] = arr[j+1];
           arr[j+1] = temp;
           continue;
         }
         if (arr[j].getPriority()> arr[j+1].getPriority()){
           continue;
         }

//      "If priority tie sort by smallest time"
         if (arr[j].getTimeCost()> arr[j+1].getTimeCost()){
           let temp = arr[j];
           arr[j] = arr[j+1];
           arr[j+1] = temp;
           continue;
         }
         if (arr[j].getTimeCost()< arr[j+1].getTimeCost()){
           continue;
         }

//      "If time tie sort by smallest energy"
         if (arr[j].getEnergyCost()> arr[j+1].getEnergyCost()){
           let temp = arr[j];
           arr[j] = arr[j+1];
           arr[j+1] = temp;
           continue;
         }
       }
     }
   }


   sortStartTime(arr){
     let n = arr.length;

     for(let i = 0; i< n;  i ++){
       for(let j = 0; j< n-i-1; j++){
          if(arr[j].startTime > arr[j+1].startTime){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
          }
       }
     }

   }

//   async createSchedule_old(arr){
//     var dayEnergy = await AsyncStorage.getItem("Day_Energy");
//     let newSchedule = [], newNotSchedule = [];
    
    
//     for (let i = 0; i < arr.length; i++){
//       if (arr[i].getEnergyCost() <= dayEnergy){
//         newSchedule.push(arr[i]);
//         dayEnergy -= arr[i].getEnergyCost();
//         if (dayEnergy < 0){
//           break;
//         }
//       }
//       else{
//         newNotSchedule.push(arr[i]);
//       }
//     }

//     console.log(newSchedule);    
//     this.setState({schedule:newSchedule})

//     console.log(newNotSchedule);
//     this.setState({notSchedule:newNotSchedule})


//   }

   async createSchedule(){
       var startDay = await ConfigStore.getConfig("startDay");
       var endDay = await ConfigStore.getConfig("endDay");

       if (startDay == null){
         startDay = "9";
       }
       if (endDay == null){
         endDay = "22";
       }

       var temp = new Date(Date.now());
       startDay = temp.setHours(parseInt(startDay),0);
       endDay = temp.setHours(parseInt(endDay),0);


       var schedule = new Schedule(startDay, endDay);
       var dayEnergy = await AsyncStorage.getItem("Day_Energy");
       let newSchedule = [];
       console.log("Start Time: " + schedule.getStartTimeText());
       console.log("End Time: " + schedule.getEndTimeText());
      

       var taskArray = await TaskStore.getAllTasks();
       this.sort(taskArray);
       let eventArray = await EventStore.getAllEvents();
       if (taskArray.length == 0 && eventArray.length == 0){
         alert("Error: No tasks or event to create a schedule. Congrats!");
         return;
       }


//    "Event insertion"
      // var eventArray = await EventStore.getAllEvents();
      for (let i = 0; i < eventArray.length; i++){
        schedule.insertEvent(eventArray[i]);
        console.log("event inserted - " + i);
      }
//    "Task insertion"
     
      for (let i = 0; i < taskArray.length; i++){
        console.log(taskArray[i]);
        if (schedule.getEnergyCost() + taskArray[i].getEnergyCost() > dayEnergy){
          console.log("Task " + i + " increases schedule enrgy over day energy.");
          continue;
        }
        console.log("Inserting task " + i);
        var insertLog = await schedule.insertTask(taskArray[i]);
        
        if (insertLog){
          newSchedule.push(taskArray[i]);
          console.log("Task inserted");
        }
        else{
          console.log(insertLog);
        }
      }
      if (schedule.getOverallSchedule().length == 0){
        alert("Error: Unable to create schedule using current time or energy. \n" +
                "Valid Time: 9:00AM - 10:00PM\n" +
                "Energy: " + dayEnergy);
        return;
      }
      await schedule.initTaskAlarms();
      ScheduleStore.saveSchedule(schedule);
      // this.setState({scheduleToday:schedule.getScheduledTasks()});

      




      let sortedSchedule = schedule.getOverallSchedule();


      

      this.sortStartTime(sortedSchedule);

      // this.sortStartTime(schedule.getOverallSchedule);
      this.setState({scheduleToday: sortedSchedule});
      Log.addCreatedSchedules();
   }

  getTimeText(date){
    date = new Date(date);
    let prettyDate = returnDate(date);
    return prettyDate;
  }


  async componentDidMount() {



    try{

    //   get Schedule from Async Storage; which is an array of schedule objects
      let scheduleArray = await ScheduleStore.getSavedSchedule();


      console.log("schedule for this time" + scheduleArray.getOverallSchedule()[0].status);

      if (scheduleArray == null){
        this.setState({scheduleToday : []});
      }
      else{
      //   we don't need to sort this one.
        await scheduleArray.initTaskAlarms();
        // this.setState({scheduleToday: scheduleArray.getScheduledTasks()});  




        let sortedSchedule = scheduleArray.getOverallSchedule();

        this.sortStartTime(sortedSchedule);


        // this.sortStartTime(scheduleArray.getOverallSchedule);
        this.setState({scheduleToday: sortedSchedule});

        // this.setState({scheduleToday: scheduleArray.getOverallSchedule()});  
      }

    
      console.log(1);
      
      // console.log(taskArray[0].getBasePriority());

      // return taskArray;
    }
    catch(error){
      console.log(error)
    }
//    this.setState({scheduleToday: []});

    this.props.navigation.addListener('focus', () => {
      // do something
      // this.sortStartTime(scheduleArray.getOverallSchedule);

      let sortedSchedule = scheduleArray.getOverallSchedule();

      this.sortStartTime(sortedSchedule);
      this.setState({scheduleToday:sortedSchedule});
      // this.setState({scheduleToday: scheduleArray});
    });
  }

  // async componentWillUnmount() {
  //   this.unsubscribe();
  // }
  

  render(){
    // console.log(3333333);
    return (
      
    <View style = {scheduleSheet().container}>
      { <FButton onPress={() => {this.createSchedule()}} 
        title= 'Generate a schedule'/>}
      <NavigationEvents onDidFocus={async () => await this.componentDidMount()} />
      {this.state.scheduleToday.length === 0 ?
        <View style = {scheduleSheet().empty}>
          <Text style = {scheduleSheet().startText}>You schedule is empty now</Text>
        </View>
        :
        <View style = {scheduleSheet().content}>
 
  
          <View style = {scheduleSheet().list}>
  
            <FlatList 
              data = {this.state.scheduleToday}
              renderItem={({item}) => (
                item.status?
                <TouchableOpacity onPress = {async () => {await ScheduleStore.completeScheduleItem(item); await this.componentDidMount()}}>
                <Text style = {scheduleSheet(item.content.getEnergyCost).scheduleItem}>
                {item.content.title} | Starts {this.getTimeText(item.startTime)}
                {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                {/* {typeof item} */}
                </Text>
                </TouchableOpacity>
                :
                <Text style = {scheduleSheet(item.content.getEnergyCost).item}>
                {item.content.title} | Starts {this.getTimeText(item.startTime)} 
                {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                {/* {typeof item} */}
                </Text>
                
              )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
  
          </View>  
        </View>
      }

    </View>
    )
  }
}

export default ShowSchedule;



