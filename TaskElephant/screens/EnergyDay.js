import React, { useState } from 'react';

import {AppRegistry, StyleSheet, View, Text,Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Slider} from '@miblanchard/react-native-slider';

export default class EnergyDay extends React.Component{

  state = {
    energy:0
  }

  setDisplayEnergy = async() => {
    try{
      var energy = await AsyncStorage.getItem("Day_Energy");
      return parseInt(energy);
    }
    catch(error){
      console.log(error);
    }
  }

  saveEnergy = async () => {
    try{
      await AsyncStorage.setItem("Day_Energy",parseInt(this.state.energy).toString());
      console.log("Energy for the day set: " + parseInt(this.state.energy));
    }
    catch(error){
      console.log(error);
    }
  }

  pressHandler = () => {
      this.saveEnergy();
      this.props.navigation.navigate('ShowTasks');
  }

  pressHandler2 = () => {
    this.saveEnergy();
    this.props.navigation.navigate('ShowEvents');
  }

  async componentDidMount(){
    this.setState({energy:await this.setDisplayEnergy()});
  }



  render() {return (
      

      <View style = {styles.container_slider}>
          <Text style = {{padding:20, marginLeft:25, marginRight:25}}>
              Enter your energy levels for the day here!
          </Text>
          <Text>{parseInt(this.state.energy)}
          </Text>
            <Slider value={this.state.energy} onValueChange={value => this.setState({energy: value})} minimumValue={1} maximumValue={100}/>
          <Text> {" "}</Text>
          <Button title = 'Continue to Tasks!' onPress = {this.pressHandler} style = {styles.button}>
          </Button>
          <Button title = 'Continue to Events!' onPress = {this.pressHandler2} style = {styles.button}>
          </Button>

          


      </View>
  )
        

}}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_slider:{
      flex: 1,
      marginTop:-100,
      marginLeft: 75,
      marginRight: 75,
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