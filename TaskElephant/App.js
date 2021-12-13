import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {AppState, NativeEventEmitter, NativeModules, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance,EventType,TimestampTrigger, TriggerType} from '@notifee/react-native';
import NotificationSounds, { playSampleSound , stopSampleSound}  from 'react-native-notification-sounds';

import Navigator from './routes/Stack';
import {clearTasks} from './objects/TaskStore';
import {clearAllLogs} from './objects/Log';
import {clearSchedule} from './objects/ScheduleStore';  
import {clearEvents} from './objects/EventStore';

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
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log(type);
  if (type == EventType.PRESSED || type == EventType.DISMISSED){
    // User has at least acknowledged notification
    console.log("Event Noticed");

    //TODO: Delete task stored in Data from TaskStore and Schedule

  }

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API


    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});


//  "Temporary 'Set to initial state' code, remove for production"
  clearTasks();
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