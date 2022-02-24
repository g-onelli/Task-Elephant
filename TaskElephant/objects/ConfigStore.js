import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './Task';

/*
 * ConfigStore contains functions regarding the use of the AsyncStorage for storing user configurations. 
 */

export const saveConfig = async (configVar, configName) => {
    /* Takes a config object user input and attempts to store it in AsyncStorage. 
        Inputs: inpTask (Task)
        Outputs: None
    */
    try{
//      console.log("JSON: " + input);
 //     console.log("Saved tasks: " + tasks);
      await AsyncStorage.setItem(configName,configVar);
      console.log("startDay set");
    }
    catch(error){
      console.log(error);
    }
  }

export const getConfig = async(configName) => {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var configVar = await AsyncStorage.getItem(configName);
      return configVar
    }
    catch(error){
      console.log(error)
    }
  }

export const initConfig = async() => {
  // "Sets the default configurations."
  try{
    await AsyncStorage.setItem("startDay","9");
    await AsyncStorage.setItem("endDay","22");
  }
  catch(error){
    console.log(error);
  }
}


export default {saveConfig, getConfig, initConfig};