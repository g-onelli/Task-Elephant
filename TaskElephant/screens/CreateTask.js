import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, ScrollView,View, TextInput, Button, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';

// import {Notifications} from 'react-native-notifications';
import {Picker} from '@react-native-picker/picker';

import Task from '../Task';
import { FlatList } from 'react-native-gesture-handler';

export default function CreateTask({navigation}) {
// [1,2] = useState is a variable declaration. 1 is the 'get' method, 2 is the 'set' method.    
  const [textIn, setTextIn] = useState("NaN");
  const [energyIn, setEnergyIn] = useState(-1);
  const [timeIn, setTimeIn] = useState(-1);
  const [deadlineIn, setDeadlineIn] = useState("NaN");
  const [priorityIn, setPriorityIn] = useState(7);


  const [tasks, setTasks] = useState([
    // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"},
    // {title:"task2", energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"2"}


  ]);


  
  function onPressButton(title,energy,time,deadline,priority) {
    const testTask = new Task(title,energy,time,deadline) 
    // alert(testTask.getTitle() + " " + testTask.getEnergyCost() + " " 
    //         + testTask.getTimeCost() + " " + testTask.getDeadline() + " " + priority);

    setTasks((prevTasks) =>{
      return [
        ...prevTasks,
        {title: testTask.getTitle(), energyCost: testTask.getEnergyCost(), timeCost: testTask.getTimeCost(),
        deadline: testTask.getDeadline(), priority: priority, key: prevTasks.length.toString()}
      ]
    })



    // navigation.navigate('Show', {title: testTask.getTitle(), energyCost: testTask.getEnergyCost(),
    // timeCost: testTask.getTimeCost(), deadline: testTask.getDeadline(), priority: priority});
  }



  function remove(key){
    setTasks((prevTasks) =>{
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
        title= 'Click here to display generated task.'>
        
        </Button>
      </View>


	  <StatusBar style="auto" />



      <View style = {styles.list}>

        <FlatList
        data = {tasks}
        renderItem = { ({item}) =>(
          <TaskItem item = {item} pressHandler = {remove}></TaskItem>
        )}>
          
        </FlatList>
        
      </View>


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
