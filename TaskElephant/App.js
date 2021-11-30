import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {AppState, NativeEventEmitter, NativeModules, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

//  "Temporary 'Set to initial state' code, remove for production"
  clearTasks();



    


  return (
    <Navigator>
      
    </Navigator>
  );
}