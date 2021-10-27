import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigator from './routes/Stack';
import {clearTasks} from './TaskStore';

export default function App() {

  

  clearTasks();

  return (
    <Navigator>
      
    </Navigator>
  );
}