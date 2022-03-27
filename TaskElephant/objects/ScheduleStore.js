import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './Task';
import Event from './Event';
import Schedule from './Schedule';
import Log from './Log.js';
/*
 * TaskStore contains functions regarding the use of the AsyncStorage for storing tasks. 
 * Either use default import (import TaskStore from './TaskStore', TaskStore.function())
 * Or import individual functions for use (import {function} from './TaskStore', function())
 */

// Some functions are necessary to store Schedules between app states using AsyncStorage.

export const saveSchedule = async (inpSchedule) => {
    /* Takes a Schedule object user input and attempts to store it in AsyncStorage. 
        Inputs: inpSchedule (Schedule)
        Outputs: None
    */
    try{
      const input = JSON.stringify(inpSchedule);
      console.log("JSON: " + input);

      await AsyncStorage.setItem("Schedule",input);
      console.log("Schedule set");
    }
    catch(error){
      console.log(error);
    }
  }
export const getSavedSchedule = async () => {
  /* Attempts to get a Schedule object from AsyncStorage. 
        Inputs: 
        Outputs: null / Schedule 
    */
    try{
      var data = await AsyncStorage.getItem("Schedule");
      console.log("Retrieved: " + data);
      if (data == null){
        return null;
      }
      else{
        data = JSON.parse(data);
        var taskSchedule = [];
        let eventSchedule = [];
        let newOverallSchedule = [];
        
        for (let scheduledTask of data.scheduledTasks){
          let tempTask = scheduledTask.content;
          // console.log("temptask: " + tempTask.title);
          //this is to make sure item.getTitle() will work in ShowSchedule.js
          tempTask = new Task(
            tempTask.title,
            tempTask.energyCost,
            tempTask.timeCost,
            tempTask.deadline,
            tempTask.basePriority,
            tempTask.key,
            tempTask.startDate
          )


          // taskSchedule.push([tempTask,scheduledTask[1],scheduledTask[2]]);

          let tempTaskItem = {
            content: tempTask,
            type: "task",
            startTime: scheduledTask.startTime,
            status: scheduledTask.status,
            key: scheduledTask.key
          }
          taskSchedule.push(tempTaskItem);

          newOverallSchedule.push(tempTaskItem);
        }


        for(let scheduledEvent of data.scheduledEvents){
          let tempEvent = scheduledEvent.content;

          // console.log("tempevent: " + tempEvent.startTime);

          tempEvent = new Event(
            tempEvent.title,
            tempEvent.timeCost,
            tempEvent.startTime,
            tempEvent.key,
            tempEvent.startDate
          );

          let tempEventItem = {
            content: tempEvent,
            type: "event",
            startTime: scheduledEvent.startTime,
            status: scheduledEvent.status,
            key: scheduledEvent.key
          }

          eventSchedule.push(tempEventItem);
          newOverallSchedule.push(tempEventItem);
        }


        



        return new Schedule(data.startTime, data.endTime, taskSchedule, data.availableTime, data.totalEnergy
          ,data.completeTasks, eventSchedule, newOverallSchedule);
      }
    }
    catch(error){
      console.log(error);
    }
}


export const completeScheduleItem = async (item) => {

  if(item.type === "task"){
    await completeTask(item.content);
  }
  else{
    await completeEvent(item.content);
  }

  
}

export const completeTask = async(task) => {

    
    try{
      var schedule = await getSavedSchedule();
      
      if (schedule == null){
        console.log("Schedule empty");
        return;
      } 
     
      schedule.completeTask(task);
      saveSchedule(schedule);
    }
    catch(error){
      console.log(error);
    }
}

export const completeEvent = async(event) => {
  try{
    let schedule = await getSavedSchedule();
    if (schedule == null){
      console.log("Schedule empty");
      return;
    } 
    schedule.completeEvent(event);
    saveSchedule(schedule);
  }
  catch(e){
    console.log(e);
  }
}

export const clearSchedule = async() => {
      /* Removes all Task objects stored in AsyncStorage. Run to reset stored data between sessions. 
        Inputs: None
        Outputs: None
    */
      try{
          await AsyncStorage.removeItem("Schedule");
          console.log("Schedule Reset");
      }
      catch(error){
          console.log(error)
      }
  }

export default {getSavedSchedule,saveSchedule,clearSchedule, completeTask, completeScheduleItem, completeEvent};