import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, ScrollView,View, TextInput, Button, TouchableOpacity } from 'react-native';

// import {Notifications} from 'react-native-notifications';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'

import Task from '../objects/Task';
import TaskItem from '../components/TaskItem';
import TaskStore from '../objects/TaskStore';
import EventStore from '../objects/EventStore';
import Event from '../objects/Event';


export default function CreateEvent({navigation}) {
// [1,2] = useState is a variable declaration. 1 is the 'get' method, 2 is the 'set' method.    
  const [textIn, setTextIn] = useState(null);
//   const [energyIn, setEnergyIn] = useState(-1);
  const [timeIn, setTimeIn] = useState(-1);
  const [startTimeIn, setStartTimeIn] = useState(new Date(Date.now()));
//   const [priorityIn, setPriorityIn] = useState(7);

  const [startTimeWindowStatus,setStartTimeWindowStatus] = useState(false);

  const [tasks, setTasks] = useState([
    // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"},
    // {title:"task2", energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"2"}


  ]);

   function initEvent(title,time,startTime){
     //  "Basic Input sanitiation, if field does not match expected value throw an alert and return."
    if (title == null || title.trim() == ""){
      alert("Error: Title is not valid.");
      return;
    }

    // if (energy < 0 || energy > 100 || isNaN(parseInt(energy))){
    //   alert("Error: " + energy + " not a valid energy cost value. [0 - 100]");
    //   return;
    // }

//  "Time cost value must be limited, or we'll run into issues regarding 
//    time cost values too large to fit in a schedule, or possibly even a day.  "
    if (time < 0 || time > 180 || isNaN(parseInt(time))){
      alert("Error: " + time + " not a valid time cost value. [0 - 180]");
      return;
    }

    if (isNaN(startTime.getTime()) && startTime != "NaN"){
      alert("Error: " + startTime + " not a valid date.");
    }

    if (startTime != "NaN" && startTime.getTime() < Date.now()){
      alert("Error: Deadline is set before present time.")
      return;
    }

    // if (deadline == "NaN") priority += 1;
    // else deadline = deadline.getTime();

    startTime = startTime.getTime();


//  "Time Cost should be a positive integer of minutes."    
    time *=  1000 * 60;

    return new Event(title,time,startTime);
   }

   async function onPressButton(title,time,startTime) {

    var testEvent = initEvent(title,time,startTime);
    if (testEvent == null) return;
    let allEvents = await EventStore.getAllEvents();
    testEvent.setKey((allEvents.length+1).toString());

    // alert(testTask.getTitle() + " " + testTask.getEnergyCost() + " " 
    //         + testTask.getTimeCost() + " " + testTask.getDeadline() + " " + priority);
    await EventStore.saveEvent(testEvent);
    // console.log(await getAllTasks());

    navigation.navigate("ShowEvents");

    // setTasks((prevTasks) =>{
    //   return [
    //     ...prevTasks,
    //     {title: testTask.getTitle(), energyCost: testTask.getEnergyCost(), timeCost: testTask.getTimeCost(),
    //     deadline: testTask.getDeadline(), priority: priority, key: prevTasks.length.toString()}
    //   ]
    // })



    // navigation.navigate('Show', {title: testTask.getTitle(), energyCost: testTask.getEnergyCost(),
    // timeCost: testTask.getTimeCost(), deadline: testTask.getDeadline(), priority: priority});
  }

  function displayDate(date){
    /* "Dates need to be converted from their milisecond data variant to a quick, readable format.
     *  Take a Date object and convert it to MM/DD/YY-HH:MM format.                               "
     */
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
 




  async function alarmTest(){
 //     Notifications.registerRemoteNotifications();
  }

  return (
    <View style={styles.container}>
      
      <TextInput placeholder="Event title input here" 
      onChangeText={text => setTextIn(text)} style = {styles.textInput}/>

      {/* <TextInput placeholder="Task energy-cost input here [0-100]" 
      onChangeText={energy => setEnergyIn(energy)} style = {styles.textInput}/> */}

      <TextInput placeholder="Event time-cost input here [min]" 
      onChangeText={time => setTimeIn(time)} style = {styles.textInput}/>

      <Button title="Event startTime input here" onPress={() => setStartTimeWindowStatus(true)}/>
      <DatePicker modal open={startTimeWindowStatus} date={startTimeIn} onConfirm={(date) => {setStartTimeWindowStatus(false); setStartTimeIn(new Date(date))}}
      onCancel={() => {setStartTimeWindowStatus(false)}}/>

      <Text> 
        {"Task StartTime: " + displayDate(startTimeIn)} 
      </Text>

      {/* <Picker prompt={"Task priority input here"} selectedValue={priorityIn} 
        style={styles.defaultPicker} onValueChange={(itemValue,itemIndex) => setPriorityIn(itemValue)}> 
        <Picker.Item label="High" value = {7}/>
        <Picker.Item label="Medium" value = {3}/>
        <Picker.Item label="Low" value = {1}/>
      </Picker> */}

      <View style = {styles.buttonView}>
        <Button onPress={() => {onPressButton(textIn,timeIn,startTimeIn); alarmTest();}} 
        title= 'Click here to display generated event.'>
        </Button>

      </View>


	  <StatusBar style="auto" />



      {/* <View style = {styles.list}>

        <FlatList
        data = {tasks}
        renderItem = { ({item}) =>(
          <TaskItem item = {item} pressHandler = {remove}></TaskItem>
        )}>
          
        </FlatList>
        
      </View> */}


    </View>

    
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  textInput:{
    height: 50,
    fontSize: 20,
    borderWidth:1,
    padding:10,
    margin:10,
    width: Platform.OS === 'ios' ? 400 : 375
    
  },

  buttonView:{
    marginTop:125,
    fontSize:40
  },
  
  defaultPicker:{
     width: 200,
     height: 50
     
  },

  list:{
    marginTop:0
  },

  
});