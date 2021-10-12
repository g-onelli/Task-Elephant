import React, { useState } from 'react';

import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, ScrollView, RefreshControlBase } from 'react-native';

export default function ShowTasks({navigation}){



  const [tasks, setTasks] = useState([
    // {title:1, energyCost:2,timeCost:3, deadline:4,priority:5 ,key:"1"}
  ])



  const refresh = () =>{
    // setTasks((prevTasks) =>{
    //   return [
    //     ...prevTasks,
    //     {title: navigation.getParam('title'), energyCost: navigation.getParam('energyCost'), 
    //     timeCost: navigation.getParam('timeCost'), deadline: navigation.getParam('deadline'), priority: navigation.getParam('priority')}
    //   ]
    // })
  }
  
  



  return (
    <View style = {styles.container}>
      <View style = {styles.content}>

        


        <View style = {styles.list}>

          <FlatList 
            data = {tasks}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Text style = {styles.item}>
                  {item.title}, {item.energyCost}, {item.timeCost}, {item.deadline}, {item.priority}
                </Text>
              </TouchableOpacity>
            )}></FlatList>

        </View>

        <View style = {styles.button}>
          <Button title = "refresh" onPress = {()=>{
            setTasks((prevTasks) =>{

              let size = prevTasks.length;
              return [

                ...prevTasks,
                {title: navigation.getParam('title'), energyCost: navigation.getParam('energyCost'), 
                timeCost: navigation.getParam('timeCost'), deadline: navigation.getParam('deadline'), 
                priority: navigation.getParam('priority'), key: (size + 1).toString()},
                
              ];
            }) 
          }}>
          
          </Button>
        </View>
        

      </View>
    </View>
  )

}




const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },

  content: {
    padding:40
  },
  list:{
    marginTop:20
  },

  button:{
    marginTop:20
  },

  item:{
    padding:16,
    marginTop:16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10
  }

})