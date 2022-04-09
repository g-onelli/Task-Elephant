import { StyleSheet, View , Platform} from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

let section = 'event';
let checkPage = (section)=>{
    let colorChoice;
    switch(section){
        case 'task':
            colorChoice = '#73a2f3';
        case 'event':
            colorChoice = '#e88c4d';
        default:
            colorChoice = '#fff';
    
    return colorChoice;
    }
}
console.log(checkPage);
//let checkPage = '#fff';

const oneItem = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: originalPalette.taskBackground,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      textInput:{
          backgroundColor: originalPalette.white,
      },
      text:{
        height: 50,
        fontSize: 20,
        borderWidth:borderStyle.narrowBorder,
        padding:10,
        margin:10,
        width: Platform.OS === 'ios' ? 400 : 375,
        backgroundColor: originalPalette.white,
        borderRadius: borderStyle.lrgCurve,
        elevation:8,
      },

      ButtonView: {
          marginTop:120,
      }
})

export default oneItem;
