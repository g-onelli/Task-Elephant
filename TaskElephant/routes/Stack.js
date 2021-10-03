import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/Welcome';
import ShowTasks from '../screens/ShowTasks';


const screens = {

    Welcome:{
        screen: Welcome
    },

    Tasks:{
        screen: ShowTasks
    },


}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);




