import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {AppState, NativeEventEmitter, NativeModules, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance,EventType,TimestampTrigger, TriggerType} from '@notifee/react-native';
import NotificationSounds, { playSampleSound , stopSampleSound}  from 'react-native-notification-sounds';

import Navigator from './routes/Stack';
import {clearTasks,getAllTasks,removeTask} from './objects/TaskStore';
import {clearAllLogs} from './objects/Log';
import {clearSchedule} from './objects/ScheduleStore';  
import {clearEvents} from './objects/EventStore';
import Task from './objects/Task';

export default function App() {
/*
const [appState, setAppState] = useState(AppState.currentState);
const handleAppStateChange = (state) => {
  setAppState(state);
}
useEffect(() => {
  AppState.addEventListener('change', handleAppStateChange);
  return (() => {
    AppState.removeEventListener('change', handleAppStateChange);
  })
}, []);
useEffect(() => {
  console.log(appState);
});
*/

async function displayNotification() {
    const soundsList = await NotificationSounds.getNotifications('ringtone');
//    console.log(soundsList[0].url)
//    playSampleSound(soundsList[0]);
//    stopSampleSound();

    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'taskelephant',
      name: 'Task-Elephant Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Time to start task!',
      body: "Sample - Test - Sample",
      android: {
        channelId,
      },
    });
  }

useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
//    console.log(type);
//    console.log("EventType.PRESS" + EventType.PRESS);
//    console.log("EventType.ACTION_PRESS" + EventType.ACTION_PRESS)
    const { notification, pressAction } = detail;
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', notification);
          break;
        case EventType.ACTION_PRESS:
          console.log(pressAction.id);
          if (pressAction.id == 'finish'){
            var storedTask = JSON.parse(notification.data.task);
            storedTask = new Task(
              storedTask["title"],
              storedTask["energyCost"],
              storedTask["timeCost"],
              storedTask["deadline"],
              storedTask["basePriority"],
              storedTask["key"],
              storedTask["startDate"]
            );
            removeTask(storedTask);
          }
          notifee.cancelNotification(notification.id);

      }
    });
  }, []);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log(type);
  if (type == EventType.PRESSED || type == EventType.DISMISSED){
    // User has at least acknowledged notification
    console.log("Event Noticed");


  }
  if (type === EventType.ACTION_PRESS){
    console.log(pressAction);
  }
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'finish') {
    // Update external API
    var storedTask = JSON.parse(notification.data.task);
    storedTask = new Task(
          storedTask["title"],
          storedTask["energyCost"],
          storedTask["timeCost"],
          storedTask["deadline"],
          storedTask["basePriority"],
          storedTask["key"],
          storedTask["startDate"]
        );
    removeTask(storedTask);


    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});


//  "Temporary 'Set to initial state' code, remove for production"
//  clearTasks();
  clearSchedule();
  clearEvents();
//  clearAllLogs();

//  "Debug functions"
//  displayNotification();




    


  return (
    <Navigator>
      
    </Navigator>
  );
}