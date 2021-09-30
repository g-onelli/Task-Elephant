import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Task from './Task.js';

export default function App() {
// [1,2] = useState is a variable declaration. 1 is the 'get' method, 2 is the 'set' method.    
  const [textIn, setTextIn] = useState(true);
  const [energyIn, setEnergyIn] = useState(true);
  const [timeIn, setTimeIn] = useState(true);
  const [deadlineIn, setDeadlineIn] = useState(true);
  
  function onPressButton(title,energy,time,deadline) {
    const testTask = new Task(title,energy,time,deadline) 
    alert(testTask.getTitle() + " " + testTask.getEnergyCost() + " " + testTask.getTimeCost() + " " + testTask.getDeadline());
  }


  return (
    <View style={styles.container}>
      
      <Text> Open up App.js to start working on your app! </Text>
      <Text>Test Application for Task Elephant </Text>
      <TextInput placeholder="Task entry title input here" onChangeText={text => setTextIn(text)}/>
      <TextInput placeholder="Task entry energy-cost input here" onChangeText={energy => setEnergyIn(energy)}/>
      <TextInput placeholder="Task entry time-cost input here" onChangeText={time => setTimeIn(time)}/>
      <TextInput placeholder="Task entry deadline input here" onChangeText={deadline => setDeadlineIn(deadline)}/>
      <Button onPress={() => onPressButton(textIn,energyIn,timeIn,deadlineIn)} title='Click here to display generated task.'></Button>

	  <StatusBar style="auto" />
    </View>
  
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
