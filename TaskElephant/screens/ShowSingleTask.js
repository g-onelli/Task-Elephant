import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../Task';
import TaskStore from '../TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import { HeaderTitle } from 'react-navigation-stack';



class ShowSingleTask extends React.Component{

    render(){
        return (
            
            <View style={styles.container}>
                <Text style = {styles.text}>Title: {this.props.navigation.getParam('title')}</Text>
                <Text style = {styles.text}>Energy Cost: {this.props.navigation.getParam('energyCost')}</Text>
                <Text style = {styles.text}>Time Cost: {this.props.navigation.getParam('timeCost')}</Text>
                <Text style = {styles.text}>Deadline: {this.props.navigation.getParam('deadline')}</Text>
                <Text style = {styles.text}>Base Priority: {this.props.navigation.getParam('basePriority')}</Text>
                <Text style = {styles.text}>Start Date: {this.props.navigation.getParam('startDate')}</Text>
                
                <View style = {styles.ButtonView}>
                    <Button color = '#FE4643'onPress={() => {
                        console.log("Deleting task");
                        TaskStore.removeTask(new Task(
                        this.props.navigation.getParam('title'),
                        this.props.navigation.getParam('energyCost'),
                        this.props.navigation.getParam('timeCost'),
                        this.props.navigation.getParam('deadline'),
                        this.props.navigation.getParam('basePriority')));
                    this.props.navigation.navigate('Show');

                }} 
                        title= 'Delete'>
                    </Button>
                </View>
            </View>
        )
    }
}

export default ShowSingleTask;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: Platform.OS === 'ios' ? 400 : 375
      },

      ButtonView: {
          marginTop:120
      }
})