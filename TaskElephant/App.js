import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Navigator from './routes/Stack';

export default function App() {

  const clearTasks = async() => {
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

  clearTasks();

  return (
    <Navigator>
      
    </Navigator>
  );
}