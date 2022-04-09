import React, { useState } from 'react';

import {AppRegistry, StyleSheet, View, Text,Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Slider} from '@miblanchard/react-native-slider';
import CustomButton from '../components/customButton';
import energyCSS from '../styling/EnergyStyle';

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
      

      <View style={energyCSS.container}>
        <View style = {energyCSS.container_slider}>
          <Text style = {energyCSS.name}>
              Enter your energy levels for the day here!
          </Text>
          <Text>{parseInt(this.state.energy)}
          </Text>
            <Slider value={this.state.energy} minimumTrackTintColor= 'rgb(250,131,50)' onValueChange={value => this.setState({energy: value})} minimumValue={1} maximumValue={100}/>
          <Text> {" "}</Text>
          <CustomButton title = 'Continue to Tasks!' onPress = {this.pressHandler}/>
          <Text>{" "}</Text>
          <CustomButton title = 'Continue to Events!' onPress = {this.pressHandler2}/>

          


      </View>
      </View>
  )
        

}}


