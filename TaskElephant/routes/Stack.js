import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import EnergyDay from "../screens/EnergyDay";
import Show from "../screens/ShowTasks";
import Header from "../components/header";
import ShowSingle from "../screens/ShowSingleTask";
import React from 'react';


const screens = {

    Welcome:{
        screen: Welcome,
        navigationOptions:{
            title: 'Home'
        }
    },

    Show: {
        screen: Show,
        navigationOptions:({navigation}) =>{
            return {
                headerTitle: () => <Header navigation = {navigation}/>
                // title: 'Your tasks'
            }
        }
    },

    Create:{
        screen: CreateTask,
        navigationOptions:{
            title: 'New Task'
        }
    },

    ShowSingle: {
        screen: ShowSingle,
        navigationOptions:{
            title: 'View Task'
        }
    },

    EnergyDay: {
        screen: EnergyDay,
        navigationOptions:{
            title: 'Set Daily Energy'
        }
    }

}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);




