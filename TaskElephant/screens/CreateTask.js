import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView,View, TextInput, Button, TouchableOpacity } from 'react-native';

// import {Notifications} from 'react-native-notifications';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

import Task from '../Task';
import TaskItem from '../components/TaskItem';
import TaskStore from '../TaskStore';


export default function CreateTask({navigation}) {
// [1,2] = useState is a variable declaration. 1 is the 'get' method, 2 is the 'set' method.    
  const [textIn, setTextIn] = useState("Null");
  const [energyIn, setEnergyIn] = useState(-1);
  const [timeIn, setTimeIn] = useState(-1);
  const [deadlineIn, setDeadlineIn] = useState("NaN");
  const [priorityIn, setPriorityIn] = useState(7);


  const [tasks, setTasks] = useState([
    // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"},
    // {title:"task2", energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"2"}


  ]);

   function initTask(title,energy,time,deadline,priority){
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

   async function onPressButton(title,energy,time,deadline,priority) {

    var testTask = initTask(title,energy,time,deadline,priority);
    let allTasks = await TaskStore.getAllTasks();
    testTask.setKey((allTasks.length+1).toString());

    // alert(testTask.getTitle() + " " + testTask.getEnergyCost() + " " 
    //         + testTask.getTimeCost() + " " + testTask.getDeadline() + " " + priority);
    await TaskStore.saveTask(testTask);
    // console.log(await getAllTasks());

    navigation.navigate("Show");

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



  function remove(key){
    TaskStore.setTasks((prevTasks) =>{
      return prevTasks.filter(task => task.key != key);
    })
  }


 




  async function alarmTest(){
//     Notifications.registerRemoteNotifications();
  }

  return (
    <View style={styles.container}>
      
      <TextInput placeholder="Task title input here" 
      onChangeText={text => setTextIn(text)} style = {styles.textInput}/>

      <TextInput placeholder="Task energy-cost input here" 
      onChangeText={energy => setEnergyIn(energy)} style = {styles.textInput}/>

      <TextInput placeholder="Task time-cost input here" 
      onChangeText={time => setTimeIn(time)} style = {styles.textInput}/>

      <TextInput placeholder="Task deadline input here" 
      onChangeText={deadline => setDeadlineIn(deadline)} style = {styles.textInput}/>

      <Picker prompt={"Task priority input here"} selectedValue={priorityIn} 
        style={styles.defaultPicker} onValueChange={(itemValue,itemIndex) => setPriorityIn(itemValue)}> 
        <Picker.Item label="High" value = "7"/>
        <Picker.Item label="Medium" value = "3"/>
        <Picker.Item label="Low" value = "1"/>
      </Picker>

      <View style = {styles.buttonView}>
        <Button onPress={() => {onPressButton(textIn,energyIn,timeIn,deadlineIn,priorityIn); alarmTest();}} 
        title= 'Save'>
        </Button>

        {/* Button is present here for demonstrating the new function. 
            Please remove once function is properly implemented. */}

        <Button onPress={() => {TaskStore.removeTask(initTask(textIn,energyIn,timeIn,deadlineIn,priorityIn));}} 
          title= 'Click here to remove task with matching info.'>
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
    width:400
    
  },

  buttonView:{
    marginTop:150,
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