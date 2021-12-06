import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Event from './Event';

/*
 * EventStore contains functions regarding the use of the AsyncStorage for storing events. 
 * Either use default import (import EventStore from './EventStore', EventStore.function())
 * Or import individual functions for use (import {function} from './EventStore', function())
 */

export const saveEvent = async (inpEvent) => {
    /* Takes a Event object user input and attempts to store it in AsyncStorage. 
        Inputs: inpEvent (Event)
        Outputs: None
    */
    try{
      const input = JSON.stringify(inpEvent);
//      console.log("JSON: " + input);
      var events = await AsyncStorage.getItem("Events");
      if (events == null){
        events = input
      }
      else{
        events += "\n" + input;
      }
 //     console.log("Saved tasks: " + tasks);
      await AsyncStorage.setItem("Events",events);
      console.log("Events set");
    }
    catch(error){
      console.log(error);
    }
  }

export const getAllEvents = async() => {
    /* Returns an array of Event objects stored in AsyncStorage. 
        Inputs: None
        Outputs: eventArray(Event[])
    */
    try{
      var events = await AsyncStorage.getItem("Events");
//      console.log(tasks);
      let eventArray = [];
      if (events == null){
        return eventArray;
      }
      console.log("Saved events: ");
      if (events.includes("\n")){
        events = events.split("\n");
      } 
      else{
        events = [events];
      }

      for (var i in events){
        if(events[i] == ""){
          continue;
        }
        var storedEvent = JSON.parse(events[i]);
        storedEvent = new Event(
          storedEvent["title"],
          storedEvent["timeCost"],
          storedEvent["startTime"],
          storedEvent["key"],
          storedEvent["startDate"]
        )
        console.log(storedEvent);
        eventArray.push(storedEvent);
      }
      return eventArray;
    }
    catch(error){
      console.log(error)
    }
}

export const removeEvent = async (inpEvent) => {
    /* Takes a Task object user input and attempts to remove it from AsyncStorage. 
        Inputs: inpTask (Task)
        Outputs: None
    */
    var eventArray = await getAllEvents();
    if (eventArray.length == 0){
      console.log("Remove- No events stored.")
      return;
    }
//    console.log(taskArray);

    for (var i = 0; i < eventArray.length; i++){
      console.log(i);
      console.log(eventArray[i]);
//      console.log(inpTask.compareTasks(taskArray[i]));
      if (inpEvent.compareEvents(eventArray[i])){
        console.log("Found and removing event...");
        eventArray.splice(i, 1);
        break;
      }      
    }
    var storedEvents = null;
    eventArray.forEach(event => {
      if (storedEvents == null){
       storedEvents = JSON.stringify(event);
      }
      else{
        storedEvents += "\n"  + JSON.stringify(event);
      }
    }); 
    if (storedEvents == null){
      await AsyncStorage.removeItem("Events")
    }
    else{
      await AsyncStorage.setItem("Events",storedEvents);  
    }
    console.log("Remove Events Complete");
  }

export async function componentDidMount() {
    /* Returns an array of Event objects stored in AsyncStorage. 
        Inputs: None
        Outputs: eventArray(Event[])
    */
    try{
        var events = await AsyncStorage.getItem("Events");
    //      console.log(tasks);
        let eventArray = [];
        if (events == null){
            return eventArray;
        }
        console.log("Saved events: ");
        if (events.includes("\n")){
            events = events.split("\n");
        } 
        else{
            events = [events];
        }
    
        for (var i in events){
            if(events[i] == ""){
            continue;
            }
            var storedEvent = JSON.parse(events[i]);
            storedEvent = new Event(
            storedEvent["title"],
            storedEvent["timeCost"],
            storedEvent["startTime"],
            storedEvent["key"],
            storedEvent["startDate"]
            )
            console.log(storedEvent);
            eventArray.push(storedEvent);
        }
        return eventArray;
    }
    catch(error){
        console.log(error)
    }
}

export const clearEvents = async() => {
      /* Removes all Event objects stored in AsyncStorage. Run to reset stored data between sessions. 
        Inputs: None
        Outputs: None
    */
      try{
          await AsyncStorage.removeItem("Events");
          console.log("Events Reset");
      }
      catch(error){
          console.log(error)
      }
  }


export default {componentDidMount, saveEvent, getAllEvents, removeEvent, clearEvents};