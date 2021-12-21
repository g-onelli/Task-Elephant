import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './Task';

/*
 * Log contains and stores data using AsyncStorage regarding available tasks. 
 */

// "logTypes are the names used by the AsyncStorage keys." 
const logTypes = ["taskLifetimes","createdSchedules","completedSchedules",
                    "numTasksInSchedule","deletedTasks","createdTasks","weeklyCreatedTasks"];

export const clearLog = async(logName) => {
  try{
    await AsyncStorage.removeItem(logName,null);
    console.log("Cleared - " + logName);
  }
  catch(e){
    console.log(e);
  }
}

export const clearAllLogs = async() => {
  for (var log of logTypes){
    clearLog(log);
  }
}

export const getLog = async (logName) => {
  try{
    var data = await AsyncStorage.getItem(logName);
    if (data == null){
      data = 0;
    }
    console.log(logName + " - " + data);
    return parseInt(data);
  }
  catch(e){
    console.log(e);
  }
}

export const setLog = async(data, logName) => {
  try{
    await AsyncStorage.setItem(logName,data);
    console.log(logName + " set");
  }
  catch(e){
    console.log(e);
  }
}

// "Some objects, like arrays, must be converted to JSON."
export const getLogJSON = async (logName) => {
  try{
    var data = await AsyncStorage.getItem(logName);
    if (data != null){
      return JSON.parse(data);
    }
    return data;
  }
  catch(e){
    console.log(e);
  }
}

export const setLogJSON = async(data, logName) => {
  try{
    await AsyncStorage.setItem(logName,JSON.stringify(data));
    console.log(logName + " set");
  }
  catch(e){
    console.log(e);
  }
}

export const addLifetime = async (lifetime) => {
  var taskLifetimes = await getLogJSON("taskLifetimes");
  if (taskLifetimes == null){
    taskLifetimes = [];
  }
  taskLifetimes.push(lifetime);
  setLogJSON(taskLifetimes,"taskLifetimes");
  console.log("Action Logged");
}

export const addCreatedSchedules = async() => {
  var createdSchedules = parseInt(await getLog("createdSchedules"));
  if (createdSchedules == null){
    createdSchedules = 0;
  }
  createdSchedules += 1;
  setLog(createdSchedules.toString(), "createdSchedules");
  console.log("Action Logged");
}

export const addCompletedSchedules = async() => {
  var completedSchedules = parseInt(await getLog("completedSchedules"));
  if (completedSchedules == null){
    completedSchedules = 0;
  }
  completedSchedules += 1;
  setLog(completedSchedules.toString(), "completedSchedules"); 
  console.log("Action Logged");
}

export const addNumTasksInSchedule = async (numTasks) => {
  var numTasksInSchedule = await getLogJSON("numTasksInSchedule");
  if (numTasksInSchedule == null){
    numTasksInSchedule = [];
  }
  numTasksInSchedule.push(numTasks);
  setLogJSON(numTasksInSchedule,"numTasksInSchedule");
  console.log("Action Logged");
}

export const addDeletedTask = async() => {
  var deletedTasks = parseInt(await getLog("deletedTasks"));
  if (deletedTasks == null){
    deletedTasks = 0;
  }
  deletedTasks += 1;
  setLog(deletedTasks.toString(), "deletedTasks");
  console.log("Action Logged");
}

export const addCreatedTasks = async() => {
  var createdTasks = parseInt(await getLog("createdTasks"));
  if (createdTasks == null){
    createdTasks = 0;
  }
  createdTasks += 1;
  setLog(createdTasks.toString(), "createdTasks");
  console.log("Action Logged");
}

export const addWeeklyCreatedTasks = async () => {
//  "Should be fired at the end of a week, data retrieved/computed from 'createdTasks'"  
  var weeklyCreatedTasks = await getLogJSON("weeklyCreatedTasks");
  if (weeklyCreatedTasks == null){
    weeklyCreatedTasks = [];
  }
  var totalTasks = parseInt(await getLog("createdTasks"));
  if (totalTasks == null){
    totalTasks = 0;
  }
  var week_totalTasks = 0;
  for (var week of weeklyCreatedTasks){
    week_totalTasks += week;
  }
  weeklyCreatedTasks.push(totalTasks-week_totalTasks);
  setLogJSON(weeklyCreatedTasks,"weeklyCreatedTasks");
  console.log("Action Logged");
}

export const checkWeek = async () => {
//  "Should fire every time the app is open, checking if it is the end of a week."
  var dateNow = new Date(Date.now());
  var endWeek = await AsyncStorage.getItem("endWeek");
  if (endWeek == null){
    endWeek = new Date(Date.now());
    endWeek.setDate(endWeek.getDate() + (6 - endWeek.getDay()))
    endWeek.setHours(24);
    endWeek.setMinutes(0,0,0);
//    console.log("Set: " + endWeek);
    AsyncStorage.setItem("endWeek",endWeek.getTime().toString());
    return;
  } 
  endWeek = new Date(parseInt(endWeek));


//  console.log(endWeek.toString());
//  console.log(endWeek.getTime() + " | " + dateNow.getTime());
  if (endWeek.getTime() < dateNow.getTime()){
    addWeeklyCreatedTasks();
    endWeek.setDate(endWeek.getDate() + 7);
    AsyncStorage.setItem("endWeek",endWeek);
  }
  //console.log(endWeek);
//  console.log(endWeek.toString());
}

export default {clearLog,clearAllLogs,getLog,setLog,getLogJSON,setLogJSON,
  addLifetime,addCreatedSchedules,addCompletedSchedules,
  addNumTasksInSchedule,addDeletedTask,addCreatedTasks,
  addWeeklyCreatedTasks,checkWeek};