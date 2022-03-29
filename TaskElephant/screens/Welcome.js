import React from 'react';

import { StyleSheet, View, Text,Button, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Log from '../objects/Log';
import CustomButton from '../components/customButton';
import welcomeStyle from '../styling/HomeScreen';

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
["taskLifetimes","createdSchedules","completedSchedules",
                    "numTasksInSchedule","deletedTasks","createdTasks","weeklyCreatedTasks"]
  
  getAllTasks();
  return (


      <View style = {welcomeStyle.container}>

          
          <Text style = {welcomeStyle.topSentence}>
              Welcome to
          </Text>
          <Image source={require("../assets/FinalLogo.png")} style={{width:200,height:200,margin:0,padding:0}}/>
          <Text style = {welcomeStyle.name}>
              Task Elephant
          </Text>


         {/* <Button title = 'Start!' onPress = {pressHandler} style = {styles.button}>
          </Button>*/}
          <CustomButton title="Start!" onPress={pressHandler}/>


          


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
    button1:{
        alignSelf: 'flex-end',
        marginTop : 200,
        //position : 'absolute',
        //padding: 50,
        //height:10,
        width:10,
        fontSize:10
    },

  });


// const styles = StyleSheet.create({
//     container : {
//         padding: 24
//     }
// });