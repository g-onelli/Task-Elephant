import React from 'react';

import { StyleSheet, View, Text,Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome({navigation}){

  const getAllTasks = async() => {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var tasks = await AsyncStorage.getItem("Tasks");
      console.log("Previously saved tasks: " + tasks);
    }
    catch(error){
      console.log(error)
    }
  }

  const pressHandler = () => {
      navigation.navigate('EnergyDay');
  }

  const debug_CurrentTime = () => {
    var date = new Date(Date.now());
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
    

  console.log(debug_CurrentTime());
  getAllTasks();
  return (


      <View style = {styles.container}>
          <Text style = {
              {
                  padding:20
              }
          }>
              Welcome to
          </Text>

          <Text style = {styles.name}>
              Task Elephant
          </Text>


          <Button title = 'Start!' onPress = {pressHandler} style = {styles.button}>

          </Button>

          


      </View>
  )
}     



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    name : {
        // padding: 70,
        marginBottom:180,
        fontSize:35,
    },


    button:{
        marginTop : 190,

        // position : 'absolute',
        // padding: 50,
        height:280
    },


  });


// const styles = StyleSheet.create({
//     container : {
//         padding: 24
//     }
// });