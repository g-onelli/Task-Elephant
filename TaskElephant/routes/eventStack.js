import { createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import CreateEvent from '../screens/CreateEvent';
import EnergyDay from "../screens/EnergyDay";
import ShowTasks from "../screens/ShowTasks";
import ShowEvents from "../screens/ShowEvents";
import ShowSchedule from "../screens/ShowSchedule";
import Header from "../components/header";
import EventHeader from '../components/EventHeader';
import ShowSingleTask from "../screens/ShowSingleTask";
import ShowSingleEvent from '../screens/ShowSingleEvent';
import React from 'react';

const screens = {

    ShowEvents:{
        screen: ShowEvents,
        navigationOptions:({navigation}) =>{
            return {
                headerTitle: () => <EventHeader navigation = {navigation}/>
                // title: 'Your events'
            }
        }
    },


    CreateEvents:{
        screen: CreateEvent,
        navigationOptions:{
            title: 'New Event'
        }
    },

    ShowSingleEvent: {
        screen: ShowSingleEvent,
        navigationOptions:{
            title: 'View Event'
        }
    },
    
}




const eventStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);

export default eventStack;