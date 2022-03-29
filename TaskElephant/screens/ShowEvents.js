import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../objects/Task';
import Event from '../objects/Event';
import TaskStore from '../objects/TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import Schedule from '../objects/Schedule';
import eventShowStyle from '../styling/EventDisplay';
import FButton from '../components/fullScreenButton';


class ShowEvents extends React.Component{
    state = {
      events:[]
    //   schedule:[],
    //   notSchedule:[]
    }
  
  
    sort(arr){
  //    var dayEnergy = await AsyncStorage.getItem("Day_Energy");
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

// sort2 sorts based on start time, the earlier gets display first
    sort2(arr){
        let n = arr.length;

        for (let i = 0; i< n; i++){
            for (let j = 0; j<n-i-1; j++){
                if(arr[j].getStartTime() > arr[j+1].getStartTime()){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
  
    async createSchedule_old(arr){
      var dayEnergy = await AsyncStorage.getItem("Day_Energy");
      let newSchedule = [], newNotSchedule = [];
      
      
      for (let i = 0; i < arr.length; i++){
        if (arr[i].getEnergyCost() <= dayEnergy){
          newSchedule.push(arr[i]);
          dayEnergy -= arr[i].getEnergyCost();
          if (dayEnergy < 0){
            break;
          }
        }
        else{
          newNotSchedule.push(arr[i]);
        }
      }
  
      console.log(newSchedule);    
      this.setState({schedule:newSchedule})
  
      console.log(newNotSchedule);
      this.setState({notSchedule:newNotSchedule})
  
  
    }
  

  
    
  
  
    async componentDidMount() {
      /* Returns an array of Event objects stored in AsyncStorage. 
          Inputs: None
          Outputs: taskArray(Task[])
      */
      try{
        var events = await AsyncStorage.getItem("Events");
        // console.log(tasks);
        let eventArray = [];
        if (events == null){
          this.setState({events: eventArray})
          return eventArray;
  
        }
        console.log("Saved events: ");
        if (events.includes("\n")){
          events = events.split("\n");
        } 
        else{
          events = [events];
        }
    
        for (var i in events){
          if(events[i] == ""){
            continue;
          }
          var storedEvents = JSON.parse(events[i]);
          storedEvents = new Event(
            storedEvents["title"],
            storedEvents["timeCost"],
            storedEvents["startTime"],
            storedEvents["key"],
            storedEvents["startDate"]
          )
    
        //   let newTaskObj = {
        //     title: storedEvents.getTitle(),
        //     energyCost: storedEvents.getEnergyCost(),
        //     timeCost: storedEvents.getTimeCost(),
        //     deadline: storedEvents.getDeadline(),
        //     priority: storedEvents.getPriority()
        //   }
          console.log(storedEvents);
          eventArray.push(storedEvents);
        }


        this.sort2(eventArray);
  //      this.createSchedule_old(taskArray);
  
        this.setState({events: eventArray});
  
        console.log(1);
        
        // console.log(taskArray[0].getBasePriority());
  
        // return taskArray;
      }
      catch(error){
        console.log(error)
      }
  
      this.props.navigation.addListener('focus', () => {
        // do something
        this.setState({events: eventArray});
      });
    }
  
    // async componentWillUnmount() {
    //   this.unsubscribe();
    // }
    
  
    render(){
      // console.log(3333333);
      return (
        
        <View style = {eventShowStyle.container}>
        <FButton onPress={() => {this.props.navigation.navigate("ShowSchedule")}} 
          title= 'View Schedule'/>
        <NavigationEvents onDidFocus={async () => await this.componentDidMount()} />
        {this.state.events.length === 0 ?
          <View style = {eventShowStyle.empty}>
            <Text style = {eventShowStyle.startText}>You don't have any events yet</Text>
          </View>
          :
        //   this.state.schedule.length !== 0 || this.state.notSchedule.length !== 0 ?
        //   <View style = {styles.content}>
   
    
        //     <View style = {styles.list}>
    
        //       <FlatList 
        //         data = {this.state.schedule}
        //         renderItem={({item}) => (
        //           <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("ShowSingleEvent", item);}}>
        //             <Text style = {styles.scheduleItem}>
        //               {item.getTitle()} | Starts {item.getStartTimeText()}
        //               {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
        //               {/* {typeof item} */}
        //             </Text>
        //           </TouchableOpacity>
        //         )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
  
        //       <FlatList 
        //         data = {this.state.notSchedule}
        //         renderItem={({item}) => (
        //           <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("ShowSingleEvent", item);}}>
        //             <Text style = {styles.item}>
        //               {item.getTitle()} | Due {item.getDeadlineText()} ({item.getPriority()})
        //               {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
        //               {/* {typeof item} */}
        //             </Text>
        //           </TouchableOpacity>
        //         )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
    
        //     </View>  
        //   </View>
        //   :
          <View style = {eventShowStyle.content}>
   
    
            <View style = {eventShowStyle.list}>
    
              <FlatList 
                data = {this.state.events}
                renderItem={({item}) => (
                  <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("ShowSingleEvent", item);}}>
                    <Text style = {eventShowStyle.scheduleItem}>
                      {item.getTitle()} | Starts {item.getStartTimeText()}
                      {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                      {/* {typeof item} */}
                    </Text>
                  </TouchableOpacity>
                )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
    
            </View>  
          </View>
        }
  
        </View>
      )
    }
  }
  
  
  
  
  export default ShowEvents;
  
  
  
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