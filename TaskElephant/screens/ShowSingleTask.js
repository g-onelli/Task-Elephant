import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../objects/Task';
import TaskStore from '../objects/TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import { HeaderTitle } from 'react-navigation-stack';
import Log from '../objects/Log.js';
import CustomButton from '../components/customButton';



class ShowSingleTask extends React.Component{
    
    dateToString(date_miliseconds){
        var date = new Date(date_miliseconds);
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
          + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }

    render(){
        return (
            
            <View style={styles.container}>
                <Text style = {styles.text}>Title: {this.props.navigation.getParam('title')}</Text>
                <Text style = {styles.text}>Energy Cost: {this.props.navigation.getParam('energyCost')}</Text>
                <Text style = {styles.text}>Time Cost: {this.props.navigation.getParam('timeCost')/1000 /60}</Text>
                <Text style = {styles.text}>Deadline: {this.dateToString(this.props.navigation.getParam('deadline'))}</Text>
                <Text style = {styles.text}>Base Priority: {this.props.navigation.getParam('basePriority')}</Text>
                
                <View style = {styles.ButtonView}>
                    <CustomButton page='delete' color = '#FE4643'onPress={() => {
                        TaskStore.removeTask(new Task(
                        this.props.navigation.getParam('title'),
                        this.props.navigation.getParam('energyCost'),
                        this.props.navigation.getParam('timeCost'),
                        this.props.navigation.getParam('deadline'),
                        this.props.navigation.getParam('basePriority')));
                        Log.addDeletedTask();

                        this.props.navigation.goBack();
                        
                    }} 
                        title= 'Delete'/>
                </View>
            </View>
        )
    }
}

export default ShowSingleTask;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(115,162,243,.9)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      text:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        backgroundColor:'#ededed',
        borderRadius:4,
        width: Platform.OS === 'ios' ? 400 : 375
      },

      ButtonView: {
          marginTop:120,
          backgroundColor:'rgba(0,0,0,.6)',
          borderRadius:10
      }
})