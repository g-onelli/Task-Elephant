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

    ShowTasks: {
        screen: ShowTasks,
        navigationOptions:({navigation}) =>{
            return {
                headerTitle: () => <Header navigation = {navigation}/>
                // title: 'Your tasks'
            }
        }
    },

    CreateTasks:{
        screen: CreateTask,
        navigationOptions:{
            title: 'New Task'
        }
    },

    ShowSingleTask: {
        screen: ShowSingleTask,
        navigationOptions:{
            title: 'View Task'
        }
    }
}




const taskStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);

export default taskStack;