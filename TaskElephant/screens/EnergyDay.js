import React, { useState } from 'react';

import {AppRegistry, StyleSheet, View, Text,Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Slider} from '@miblanchard/react-native-slider';

export default function EnergyDay({navigation}){

  const [dailyEnergy, setDailyEnergy] = useState(0);

  const saveEnergy = async () => {
    try{
      var dayEnergy = await AsyncStorage.getItem("Day_Energy");
      await AsyncStorage.setItem("Day_Energy",parseInt(dailyEnergy));
      console.log("Energy for the day set: " + parseInt(dailyEnergy));
    }
    catch(error){
      console.log(error);
    }
  }

  const pressHandler = () => {
      saveEnergy();
      navigation.navigate('Create');
  }

  return (


      <View style = {styles.container_slider}>
          <Text style = {{padding:20}}>
              Enter your energy levels for the day here!
          </Text>
          <Text>{parseInt(dailyEnergy)}
          </Text>
            <Slider value={dailyEnergy} onValueChange={value => setDailyEnergy(value)} minimumValue={1} maximumValue={100}/>
          
          <Text style = {styles.name}>
              Check
          </Text>


          <Button title = 'Create a task' onPress = {pressHandler} style = {styles.button}>
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
    container_slider:{
      flex: 1,
      marginLeft: 100,
      marginRight: 100,
      alignItems: 'stretch',
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