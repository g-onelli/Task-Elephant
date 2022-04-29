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
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import createStyle from '../styling/TaskCreation';



// class ShowSingleTask extends React.Component{
    
//     dateToString(date_miliseconds){
//         var date = new Date(date_miliseconds);
//         return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
//           + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
//         }

//     render(){
//         return (
            
//             <View style={styles.container}>
//                 <Text style = {styles.text}>Title: {this.props.navigation.getParam('title')}</Text>

//                 <TextInput placeholder='Title' style = {styles.text} defaultValue={this.props.navigation.getParam('title')}></TextInput>

//                 <Text style = {styles.text}>Energy Cost: {this.props.navigation.getParam('energyCost')}</Text>

//                 <TextInput placeholder='Energy cost' style = {styles.text} defaultValue={this.props.navigation.getParam('energyCost')}></TextInput>

//                 <Text style = {styles.text}>Time Cost: {this.props.navigation.getParam('timeCost')/1000 /60}</Text>

//                 <TextInput placeholder= 'Time cost' style={styles.text} defaultValue = {(this.props.navigation.getParam('timeCost')/1000/60).toString()}></TextInput>


//                 <Text style = {styles.text}>Deadline: {this.dateToString(this.props.navigation.getParam('deadline'))}</Text>

                
//                 <Text style = {styles.text}>Base Priority: {this.props.navigation.getParam('basePriority')}</Text>
                
//                 <View style = {styles.ButtonView}>
//                     <CustomButton page='delete' color = '#FE4643'onPress={() => {
//                         TaskStore.removeTask(new Task(
//                         this.props.navigation.getParam('title'),
//                         this.props.navigation.getParam('energyCost'),
//                         this.props.navigation.getParam('timeCost'),
//                         this.props.navigation.getParam('deadline'),
//                         this.props.navigation.getParam('basePriority')));
//                         Log.addDeletedTask();

//                         this.props.navigation.goBack();
                        
//                     }} 
//                         title= 'Delete'/>
//                 </View>
//             </View>
//         )
//     }
// }

// export default ShowSingleTask;


export default function ShowSingleTask({navigation}){
    const [textIn, setTextIn] = useState(null);
    const [energyIn, setEnergyIn] = useState(-1);
    const [timeIn, setTimeIn] = useState(-1);
    const [deadlineIn, setDeadlineIn] = useState(new Date(navigation.getParam('deadline')));
    const [priorityIn, setPriorityIn] = useState(navigation.getParam('basePriority'));

    const [deadlineWindowStatus,setDeadlineWindowStatus] = useState(false);

    function dateToString(date_miliseconds){
        var date = new Date(date_miliseconds);
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
            + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }

    function displayDate(date){
        /* "Dates need to be converted from their milisecond data variant to a quick, readable format.
         *  Take a Date object and convert it to MM/DD/YY-HH:MM format.                               "
         */
        return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
          + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }

    return (
        <View style={styles.container}>
                {/* <Text style = {styles.text}>Title: {navigation.getParam('title')}</Text> */}

                <TextInput placeholder='Title' style = {styles.text} defaultValue={navigation.getParam('title')}></TextInput>

                {/* <Text style = {styles.text}>Energy Cost: {navigation.getParam('energyCost')}</Text> */}

                <TextInput placeholder='Energy cost' style = {styles.text} defaultValue={navigation.getParam('energyCost')}></TextInput>

                {/* <Text style = {styles.text}>Time Cost: {navigation.getParam('timeCost')/1000 /60}</Text> */}

                <TextInput placeholder= 'Time cost' style={styles.text} defaultValue = {(navigation.getParam('timeCost')/1000/60).toString()}></TextInput>


                <TouchableOpacity onPress={() => setDeadlineWindowStatus(true)}>

                    <Text style = {styles.text}>{"I need this done by: " + displayDate(deadlineIn)}  </Text>
                </TouchableOpacity>
                


                {/* <CustomButton title="When is the task due?" onPress={() => setDeadlineWindowStatus(true)}/> */}
                <DatePicker modal open={deadlineWindowStatus} date={deadlineIn} onConfirm={(date) => {setDeadlineWindowStatus(false); setDeadlineIn(new Date(date))}}
                onCancel={() => {setDeadlineWindowStatus(false)}}/>

            
                {/* <Text style = {styles.text}>Base Priority: {navigation.getParam('basePriority')}</Text> */}
                
                <Picker prompt={"How important is the task to you"} selectedValue={priorityIn} 
                    style={createStyle.defaultPicker} onValueChange={(itemValue,itemIndex) => setPriorityIn(itemValue)}> 
                    
                    <Picker.Item label="High" value = {7}/>
                    <Picker.Item label="Medium" value = {3}/>
                    <Picker.Item label="Low" value = {1}/>
                    
                    
                </Picker>


                <View style = {styles.ButtonView}>

                    <CustomButton color = '#FE4643'onPress={() => {
                        
                        navigation.goBack();
                        
                        }} 
                        title= 'Save'/>
                     
                </View>
                
                
                <View style = {styles.ButtonView}>
                    
                     <CustomButton page='delete' color = '#FE4643'onPress={() => {
                        TaskStore.removeTask(new Task(
                        navigation.getParam('title'),
                        navigation.getParam('energyCost'),
                        navigation.getParam('timeCost'),
                        navigation.getParam('deadline'),
                        navigation.getParam('basePriority')));
                        Log.addDeletedTask();

                        navigation.goBack();
                        
                    }} 
                        title= 'Delete'/>
                </View>
            </View>
    )   
}


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
        borderWidth: 1,
        padding:10,
        margin:10,
        backgroundColor:'#ededed',
        borderRadius:4,
        width: Platform.OS === 'ios' ? 415 : 375
      },

      ButtonView: {
          marginTop:120,
          backgroundColor:'rgba(0,0,0,.6)',
          borderRadius:10,
          marginBottom: -90
      },

      defaultPicker:{
        width: 200,
        height: 50
        
     }
})