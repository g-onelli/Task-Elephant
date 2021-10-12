import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import CreateTask from '../screens/CreateTask';
import Show from "../screens/ShowTasks";


const screens = {

    Welcome:{
        screen: Welcome
    },

    Create:{
        screen: CreateTask
    },

    Show: {
        screen: Show
    }


}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);




