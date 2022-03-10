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
import Log from '../objects/Log';



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
       var schedule = new Schedule();
       var dayEnergy = await AsyncStorage.getItem("Day_Energy");
       let newSchedule = [];
       console.log("Start Time: " + schedule.getStartTimeText());
       console.log("End Time: " + schedule.getEndTimeText());
      


//    "Event insertion"
      var eventArray = await EventStore.getAllEvents();

      console.log("finished fetching schedules from async storage.");

      console.log(`number of events: ${eventArray.length}`);

      for (let i = 0; i < eventArray.length; i++){
        schedule.insertEvent(eventArray[i]);
        console.log("event inserted - " + i);
      }

      
  //  "Task insertion"
      var taskArray = await TaskStore.getAllTasks();
      this.sort(taskArray);
      if (taskArray.length == 0){
        alert("Error: No tasks to create a schedule. Congrats!");
        return;
      }
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
       if (schedule.getScheduledTasks().length == 0){
         alert("Error: Unable to create schedule using current time or energy. \n" +
                 "Valid Time: 9:00AM - 10:00PM\n" +
                 "Energy: " + dayEnergy);
         return;
       }
       await schedule.initTaskAlarms();
      ScheduleStore.saveSchedule(schedule);

      this.setState({scheduleToday:schedule.getScheduledTasks()});
      // this.setState({scheduleToday: schedule.getScheduledEvents()});
      // this.setState({scheduleToday: schedule.getCombinedSchedule()});

      console.log(`schedule is not empty: ${this.state.scheduleToday.length == 0}`);
      


      Log.addCreatedSchedules();
  }

  getTimeText(date){
    date = new Date(date);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }


  async componentDidMount() {

    try{

    //   get Schedule from Async Storage; which is an array of schedule objects
      let scheduleArray = await ScheduleStore.getSavedSchedule();
      if (scheduleArray == null){
        this.setState({scheduleToday : []});
      }
      else{
      //   we don't need to sort this one.
        await scheduleArray.initTaskAlarms();
        this.setState({scheduleToday: scheduleArray.getScheduledTasks()});  
        // this.setState({scheduleToday: scheduleArray.getScheduledEvents});
        // this.setState({scheduleToday: scheduleArray.getCombinedSchedule()});
        
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
      this.setState({scheduleToday: scheduleArray});
    });
  }

  // async componentWillUnmount() {
  //   this.unsubscribe();
  // }
  

  render(){
    // console.log(3333333);
    return (
      
      <View style = {styles.container}>
      { <Button onPress={() => {this.createSchedule()}} 
        title= 'Click here to generate a schedule.'>
      </Button> }
      <NavigationEvents onDidFocus={async () => await this.componentDidMount()} />
      {this.state.scheduleToday.length === 0 ?
        <View style = {styles.empty}>
          <Text style = {styles.startText}>You schedule is empty now</Text>
        </View>
        :
        <View style = {styles.content}>
 
  
          <View style = {styles.list}>
  
            <FlatList 
              data = {this.state.scheduleToday}
              renderItem={({item}) => (
                item.status?
                <TouchableOpacity onPress = {async () => {await ScheduleStore.completeTask(item); await this.createSchedule()}}>
                <Text style = {styles.scheduleItem}>
                  {item.thing.title} | Starts {this.getTimeText(item.startTime)}
                {/* {item[0].getTitle()} | Starts {this.getTimeText(item[1])} */}
                {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                {/* {typeof item} */}
                </Text>
                </TouchableOpacity>
                :
                <Text style = {styles.item}>
                  {item.thing.title} | Starts {this.getTimeText(item.startTime)}
                {/* {item[0].getTitle()} | Starts {this.getTimeText(item[1])} */}
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



const styles = StyleSheet.create({
  container: {
    marginTop:0,
    flex:1,
    backgroundColor: "#fff",
  },

  content: {
    flex:1,
    padding:40
  },
  list:{
    marginTop:10
  },

  button:{
    marginBottom:20
  },

  empty:{
    // flex:1,
    // alignItems: 'center',
    // justifyContent: 'center'

    justifyContent:'center',
    alignItems: 'center',
    top: '40%', left: 0, 
    right: 0, bottom: 0, 
    
  },

  startText:{
    color:'#9D9B9C',
    fontSize: 18
  },

  scheduleItem:{
    padding:16,
    marginTop:16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    textAlign:'center'
  },  

  item:{
    backgroundColor: "rgba(225,225,225,0.3)",
    color: "rgba(0,0,0,0.5)",

    padding:16,
    marginTop:16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    textAlign:'center'
  }

})