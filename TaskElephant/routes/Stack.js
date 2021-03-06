import { createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import CreateEvent from '../screens/CreateEvent';
import EnergyDay from "../screens/EnergyDay";
import ShowTasks from "../screens/ShowTasks";
import ShowEvents from "../screens/ShowEvents";
import ShowSchedule from "../screens/ShowSchedule";
import DrawerHeader from "../components/drawerHeader";
import EventHeader from '../components/EventHeader';
import ShowSingleTask from "../screens/ShowSingleTask";
import ShowSingleEvent from '../screens/ShowSingleEvent';
import Config from '../screens/Config';
import React from 'react';


const screens = {

    Welcome:{
        screen: Welcome,
        // navigationOptions:{
        //     title: 'Home'
        // }
        
        navigationOptions:({navigation}) =>{
            return {
                headerTitle: () => <DrawerHeader navigation = {navigation} title = 'Home screen'/>
                // title: 'Your tasks'
            }
        }
    },

    // ShowTasks: {
    //     screen: ShowTasks,
    //     navigationOptions:({navigation}) =>{
    //         return {
    //             headerTitle: () => <Header navigation = {navigation}/>
    //             // title: 'Your tasks'
    //         }
    //     }
    // },

    // ShowEvents:{
    //     screen: ShowEvents,
    //     navigationOptions:({navigation}) =>{
    //         return {
    //             headerTitle: () => <EventHeader navigation = {navigation}/>
    //             // title: 'Your events'
    //         }
    //     }
    // },

    // ShowSchedule: {
    //     screen: ShowSchedule,
        
    //     navigationOptions:{
    //         title: 'Your Schedule'
    //     }
    // },

    // CreateTasks:{
    //     screen: CreateTask,
    //     navigationOptions:{
    //         title: 'New Task'
    //     }
    // },

    // CreateEvents:{
    //     screen: CreateEvent,
    //     navigationOptions:{
    //         title: 'New Event'
    //     }
    // },

    // ShowSingleTask: {
    //     screen: ShowSingleTask,
    //     navigationOptions:{
    //         title: 'View Task'
    //     }
    // },

    // ShowSingleEvent: {
    //     screen: ShowSingleEvent,
    //     navigationOptions:{
    //         title: 'View Event'
    //     }
    // },

    EnergyDay: {
        screen: EnergyDay,
        navigationOptions:{
            title: 'Set Daily Energy'
        }
    }

}


const HomeStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);

export default HomeStack;



