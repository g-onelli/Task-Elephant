import { StyleSheet, View } from "react-native";
import { Platform } from "react-native-web";
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
        backgroundColor: '#73a2f3',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      textInput:{
          backgroundColor: '#fff',
      },
      text:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        width: Platform.OS === 'ios' ? 400 : 375,
        backgroundColor:'#fff',
        borderRadius: 10,
        elevation:8,
      },

      ButtonView: {
          marginTop:120,
      }
})

export default oneItem;