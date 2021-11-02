import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../Task';
import TaskStore from '../TaskStore'
import { StackRouter } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';




class ShowTasks extends React.Component{
  state = {
    tasks:[]
  }

  async componentDidMount() {
    /* Returns an array of Task objects stored in AsyncStorage. 
        Inputs: None
        Outputs: taskArray(Task[])
    */
    try{
      var tasks = await AsyncStorage.getItem("Tasks");
      // console.log(tasks);
      let taskArray = [];
      if (tasks == null){
        return taskArray;
      }
      console.log("Saved tasks: ");
      if (tasks.includes("\n")){
        tasks = tasks.split("\n");
      } 
      else{
        tasks = [tasks];
      }
  
      for (var i in tasks){
        if(tasks[i] == ""){
          continue;
        }
        var storedTask = JSON.parse(tasks[i]);
        storedTask = new Task(
          storedTask["title"],
          storedTask["energyCost"],
          storedTask["timeCost"],
          storedTask["deadline"],
          storedTask["basePriority"],
          storedTask["key"],
          storedTask["startDate"]
        )
  
        let newTaskObj = {
          title: storedTask.getTitle(),
          energyCost: storedTask.getEnergyCost(),
          timeCost: storedTask.getTimeCost(),
          deadline: storedTask.getDeadline(),
          priority: storedTask.getPriority()
        }
        console.log(storedTask);
        taskArray.push(storedTask);
      }

      this.setState({tasks: taskArray});
      


      // return taskArray;
    }
    catch(error){
      console.log(error)
    }

    this.props.navigation.addListener('focus', () => {
      // do something
      this.setState({tasks: taskArray});
    });
  }

  // async componentWillUnmount() {
  //   this.unsubscribe();
  // }
  

  render(){
    return (
      
    
      <View style = {styles.container}>
        <View style = {styles.content}>
  
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
  
  
          <View style = {styles.list}>
  
            <FlatList 
              data = {this.state.tasks}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <Text style = {styles.item}>
                    {item.getTitle()}
                    {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                    {/* {typeof item} */}
                  </Text>
                </TouchableOpacity>
              )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
  
          </View>
  
          
          
  
        </View>
      </View>
    )
  }
}


// function ShowTasks({navigation}){



//   const [tasks, setTasks] = useState([
//     // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"}
//   ])

  
//   async function getAllTasks() {
//     /* Returns an array of Task objects stored in AsyncStorage. 
//         Inputs: None
//         Outputs: taskArray(Task[])
//     */
//     try{
//       var tasks = await AsyncStorage.getItem("Tasks");
//   //      console.log(tasks);
//       let taskArray = [];
//       if (tasks == null){
//         return taskArray;
//       }
//       console.log("Saved tasks: ");
//       if (tasks.includes("\n")){
//         tasks = tasks.split("\n");
//       } 
//       else{
//         tasks = [tasks];
//       }
  
//       for (var i in tasks){
//         if(tasks[i] == ""){
//           continue;
//         }
//         var storedTask = JSON.parse(tasks[i]);
//         storedTask = new Task(
//           storedTask["title"],
//           storedTask["energyCost"],
//           storedTask["timeCost"],
//           storedTask["deadline"],
//           storedTask["priority"],
//           storedTask["key"]
//         )
  
//         let newTaskObj = {
//           title: storedTask.getTitle(),
//           energyCost: storedTask.getEnergyCost(),
//           timeCost: storedTask.getTimeCost(),
//           deadline: storedTask.getDeadline(),
//           priority: storedTask.getPriority()
//         }
//         console.log(storedTask);
//         taskArray.push(storedTask);
//       }

//       setTasks(taskArray);
//       return taskArray;
//     }
//     catch(error){
//       console.log(error)
//     }
//   }

  

//   // async function start(){
//   //   try{
//   //     const allTasks = await getAllTasks();
      
//   //     data2 = allTasks;

//   //     console.log(data2.length);

//   //     return;
//   //   }
//   //   catch(e){
//   //     console.log(e);
//   //   }
//   // }

//   // start();
//   // console.log(data2.length);

  
  
//   // console.log(data);

//   // const data = start();
//   // console.log(data);


//   // let data2 = await getAllTasks(); 

//   // let allTasks = 0;
//   // const allTasks = await getAllTasks();
  
//   let data3 = [{
//     "deadline": "NaN",
//     "energyCost": -1,
//     "key": "1",
//     "priority": 7,
//     "timeCost": -1,
//     "title": "NaN"
//   },]

//   // console.log(data3[0]);


  


//   return (
//     <View style = {styles.container}>
//       <View style = {styles.content}>

//       <View style = {styles.button}>
//         <Button onPress={() => {start()}} 
//         title= 'refresh'>
//         </Button>
//       </View>


//         <View style = {styles.list}>

//           <FlatList 
//             data = {tasks}
//             renderItem={({item}) => (
//               <TouchableOpacity>
//                 <Text style = {styles.item}>
//                   {/* {item.getTitle()}, {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
//                   {typeof item}
//                 </Text>
//               </TouchableOpacity>
//             )}></FlatList>

//         </View>

        
        

//       </View>
//     </View>
//   )
// }

export default ShowTasks;



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },

  content: {
    flex:1,
    padding:40
  },
  list:{
    flex:1,
    marginTop:10
  },

  button:{
    marginBottom:20
  },

  item:{
    padding:16,
    marginTop:16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    textAlign:'center'
  }

})