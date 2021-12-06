import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {AppState, NativeEventEmitter, NativeModules, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance,EventType,TimestampTrigger, TriggerType} from '@notifee/react-native';
import NotificationSounds, { playSampleSound , stopSampleSound}  from 'react-native-notification-sounds';

import Navigator from './routes/Stack';
import {clearTasks} from './objects/TaskStore';  

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


//  "Temporary 'Set to initial state' code, remove for production"
  clearTasks();

//  "Debug to verify that notifications work."
//  displayNotification();



    


  return (
    <Navigator>
      
    </Navigator>
  );
}