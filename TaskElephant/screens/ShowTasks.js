import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../Task';

export default function ShowTasks({navigation}){



  const [tasks, setTasks] = useState([
    // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"}
  ])



  async function getAllTasks() {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var tasks = await AsyncStorage.getItem("Tasks");
//      console.log(tasks);
      let taskArray = [];
      if (tasks == null){
        return taskArray;
      }
      console.log("Saved tasks: ");
      if (tasks.includes("\n")){
        tasks = tasks.split("\n");
      } 
      else{
        tasks = [tasks];
      }

      for (var i in tasks){
        if(tasks[i] == ""){
          continue;
        }
        var storedTask = JSON.parse(tasks[i]);
        storedTask = new Task(
          storedTask["title"],
          storedTask["energyCost"],
          storedTask["timeCost"],
          storedTask["deadline"],
          storedTask["priority"],
          storedTask["key"]
        )
        console.log(storedTask);
        taskArray.push(storedTask);
      }
      return taskArray;
    }
    catch(error){
      console.log(error)
    }
  }

  async function start(){
    try{
      const allTasks = await getAllTasks();
      // console.log(allTasks);

      setTasks(allTasks);
      console.log(1);

      return allTasks;
    }
    catch(e){
      console.log(e);
    }
  }

  


  // const data = start();
  // console.log(data);




  // let allTasks = 0;
  // const allTasks = await getAllTasks();
  



  return (
    <View style = {styles.container}>
      <View style = {styles.content}>

      <View style = {styles.button}>
        <Button onPress={() => {start()}} 
        title= 'refresh'>
        </Button>
      </View>


        <View style = {styles.list}>

          <FlatList 
            data = {tasks}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Text style = {styles.item}>
                  {item.title}, {item.energyCost}, {item.timeCost}, {item.deadline}, {item.priority}
                </Text>
              </TouchableOpacity>
            )}></FlatList>

        </View>

        
        

      </View>
    </View>
  )


  

  

  
}




const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },

  content: {
    padding:40
  },
  list:{
    marginTop:20
  },

  button:{
    marginBottom:20
  },

  item:{
    padding:16,
    marginTop:16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10
  }

})