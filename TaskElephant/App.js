import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
// [1,2] = useState is a variable declaration. 1 is the 'get' method, 2 is the 'set' method.    
  const [text, setText] = useState(true);
  const [number, setNumber] = useState(true);
  const [anything, setAnything] = useState(true);
  
  function _onPressButton(text) {
    alert(text);
  }


  return (
    <View style={styles.container}>
      
      <Text> Open up App.js to start working on your app! </Text>
      <Text>Test Application for Task Elephant </Text>
      <TextInput placeholder="Text entry input here" onChangeText={text => setText(text)}/>
      <button onClick={() => _onPressButton(text)}>Click here to<br />display input text.</button>

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
