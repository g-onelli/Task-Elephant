import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import Show from "../screens/ShowTasks";
import Header from "../components/header";
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
    }

    


}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);




