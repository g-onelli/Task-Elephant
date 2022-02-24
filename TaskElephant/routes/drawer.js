import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./Stack";
import taskStack from "./taskStack";
import eventStack from "./eventStack";
import scheduleStack from "./scheduleStack";
import configStack from "./ConfigStack";
import config from '../screens/Config'
import test from '../screens/Welcome';
import DrawerHeader from '../components/drawerHeader';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },

    Tasks: {
        screen: taskStack
    },

    Events:{
        screen: eventStack
    },

    Schedule:{
        screen: scheduleStack
    },
    Config:{
        screen:configStack
    }
});
   
const CustomDrawerComponent = (props) => {

}

/*const Drawer = createDrawerNavigator();

function MyDrawer() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={config}/>
        </Drawer.Navigator>
    )
}*/

// If having trouble called "interpolate" is not a function
// https://stackoverflow.com/questions/67840220/getting-typeerror-interpolate-is-not-a-function-in-react-native

export default createAppContainer(RootDrawerNavigator);
