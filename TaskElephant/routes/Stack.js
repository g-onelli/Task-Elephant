import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React from 'react';

import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import Show from "../screens/ShowTasks";
import Header from "../components/header";
import EnergyDay from "../screens/EnergyDay";

const screens = {

    Welcome:{
        screen: Welcome,
        navigationOptions:{
            title: 'Home'
        }
    },

    EnergyDay:{
        screen:EnergyDay,
        navigationOptions:{
            title: 'Set Daily Energy'
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
    }

    


}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);




