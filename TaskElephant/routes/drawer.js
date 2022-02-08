import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./Stack";
import taskStack from "./taskStack";
import eventStack from "./eventStack";
import scheduleStack from "./scheduleStack";


const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },

    Tasks: {
        screen: taskStack
    },

    Events:{
        screen: eventStack
    },

    Schedule:{
        screen: scheduleStack
    }
});


// If having trouble called "interpolate" is not a function
// https://stackoverflow.com/questions/67840220/getting-typeerror-interpolate-is-not-a-function-in-react-native

export default createAppContainer(RootDrawerNavigator);