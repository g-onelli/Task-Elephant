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

    ShowSchedule: {
        screen: ShowSchedule,
        
        navigationOptions:{
            title: 'Your Schedule'
        }
    }
}




const scheduleStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);

export default scheduleStack;