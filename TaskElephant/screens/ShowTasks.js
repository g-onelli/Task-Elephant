import React, { useState } from 'react';

import { StyleSheet, View, Text,Button,FlatList } from 'react-native';

export default function ShowTasks(){



  const [tasks, setTasks] = useState([
    {title:"tasks 1", energy_cost: 3, time_cost:2, deadline:"3/8", priority: "high", key: "1"},
    {title:"tasks 2", energy_cost: 4, time_cost:3, deadline:"4/2", priority: "medium", key: "2"},
  ])


  return (
    <View style = {styles.container}>
      <View style = {styles.content}>

        <View style = {styles.list}>

          <FlatList data = {tasks}
            renderItem={({item}) => (
              <Text>{item.title}</Text>
            )}></FlatList>

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
  }
})