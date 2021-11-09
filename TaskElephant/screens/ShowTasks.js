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


  sort(arr){
    let n = arr.length;
    for (let i =0; i< n-1; i++){
      for (let j = 0; j< n-i-1; j ++){
        if (arr[j].getBasePriority()< arr[j+1].getBasePriority()){
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
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
        // console.log("get empty");
        // this.render();
        this.setState({tasks: taskArray});
        // return taskArray;
        return;
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

      this.sort(taskArray);

      this.setState({tasks: taskArray});

      console.log(1);
      
      // console.log(taskArray[0].getBasePriority());

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
    // console.log(3333333);
    return (
      
      <View style = {styles.container}>
      <NavigationEvents onDidFocus={() => this.componentDidMount()} />

      {this.state.tasks.length === 0 ?
        <View style = {styles.empty}>
        <Text style = {styles.startText}>You don't have any tasks yet</Text>
        </View>
        :
        <View style = {styles.content}>
  
          
  
          
  
          <View style = {styles.list}>
  
            <FlatList 
              data = {this.state.tasks}
              renderItem={({item}) => (
                <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("ShowSingle", item)}}>
                  <Text style = {styles.item}>
                    {item.getTitle()}, {item.getBasePriority()}
                    {/* , {item.getEnergyCost()}, {item.getTimeCost()}, {item.getDeadline()}, {item.getPriority()} */}
                    {/* {typeof item} */}
                  </Text>
                </TouchableOpacity>
              )}>{this.props.isFocused ? 'Focused' : 'Not focused'}</FlatList> 
  
          </View>
  
          
          
  
        </View>}
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

  empty:{
    // flex:1,
    // alignItems: 'center',
    // justifyContent: 'center'

    position:'absolute',
    justifyContent:'center',
    alignItems: 'center',
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    
  },

  startText:{
    color:'#9D9B9C',
    fontSize: 18
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