import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './Task';

/*
 * TaskStore contains functions regarding the use of the AsyncStorage for storing tasks. 
 * Either use default import (import TaskStore from './TaskStore', TaskStore.function())
 * Or import individual functions for use (import {function} from './TaskStore', function())
 */

export const saveTask = async (inpTask) => {
    /* Takes a Task object user input and attempts to store it in AsyncStorage. 
        Inputs: inpTask (Task)
        Outputs: None
    */
    try{
      const input = JSON.stringify(inpTask);
//      console.log("JSON: " + input);
      var tasks = await AsyncStorage.getItem("Tasks");
      if (tasks == null){
        tasks = input
      }
      else{
        tasks += "\n" + input;
      }
 //     console.log("Saved tasks: " + tasks);
      await AsyncStorage.setItem("Tasks",tasks);
      console.log("Tasks set");
    }
    catch(error){
      console.log(error);
    }
  }

export const getAllTasks = async() => {
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
          storedTask["basePriority"],
          storedTask["key"],
          storedTask["startDate"]
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

export const removeTask = async (inpTask) => {
    /* Takes a Task object user input and attempts to remove it from AsyncStorage. 
        Inputs: inpTask (Task)
        Outputs: None
    */
    var taskArray = await getAllTasks();
    if (taskArray.length == 0){
      console.log("Remove- No tasks stored.")
      return;
    }
//    console.log(taskArray);

    for (var i = 0; i < taskArray.length; i++){
      console.log(i);
      console.log(taskArray[i]);
//      console.log(inpTask.compareTasks(taskArray[i]));
      if (inpTask.compareTasks(taskArray[i])){
        console.log("Found and removing task...");
        taskArray.splice(i, 1);
        break;  
      }      
    }
    var storedTasks = null;
    taskArray.forEach(task => {
      if (storedTasks == null){
       storedTasks = JSON.stringify(task);
      }
      else{
        storedTasks += "\n"  + JSON.stringify(task);
      }
    }); 
    if (storedTasks == null){
      await AsyncStorage.removeItem("Tasks")
    }
    else{
      await AsyncStorage.setItem("Tasks",storedTasks);  
    }
    console.log("Remove Tasks Complete");
  }

export async function componentDidMount() {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var tasks = await AsyncStorage.getItem("Tasks");
      // console.log(tasks);
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
  
        let newTaskObj = {
          title: storedTask.getTitle(),
          energyCost: storedTask.getEnergyCost(),
          timeCost: storedTask.getTimeCost(),
          deadline: storedTask.getDeadline(),
          priority: storedTask.getPriority()
        }
        console.log(storedTask);
        taskArray.push(storedTask);
      }

      this.setState({tasks: taskArray});
      // return taskArray;
    }
    catch(error){
      console.log(error)
    }
  }

export const clearTasks = async() => {
      /* Removes all Task objects stored in AsyncStorage. Run to reset stored data between sessions. 
        Inputs: None
        Outputs: None
    */
      try{
          await AsyncStorage.removeItem("Tasks");
          console.log("Tasks Reset");
      }
      catch(error){
          console.log(error)
      }
  }


export default {componentDidMount, saveTask, getAllTasks, removeTask, clearTasks};