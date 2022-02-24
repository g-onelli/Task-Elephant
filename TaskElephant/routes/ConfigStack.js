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

    Config:{
        screen: Config,
        // navigationOptions:{
        //     title: 'Home'
        // }
        
        navigationOptions:({navigation}) =>{
            return {
                headerTitle: () => <DrawerHeader navigation = {navigation} title = 'Config'/>
                // title: 'Your tasks'
            }
        }
    },


}


const ConfigStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);

export default ConfigStack;



