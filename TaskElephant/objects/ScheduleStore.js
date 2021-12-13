import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './Task';
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
        var schedule = [];
        for (var scheduledTask of data.scheduledTasks){
          var tempTask = scheduledTask[0];
          tempTask = new Task(
            tempTask["title"],
            tempTask["energyCost"],
            tempTask["timeCost"],
            tempTask["deadline"],
            tempTask["basePriority"],
            tempTask["key"],
            tempTask["startDate"]
          )
          schedule.push([tempTask,scheduledTask[1]]);
        }
        return new Schedule(data.startTime, schedule, data.availableTime, data.totalEnergy);
      }
    }
    catch(error){
      console.log(error);
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

export default {getSavedSchedule,saveSchedule,clearSchedule};