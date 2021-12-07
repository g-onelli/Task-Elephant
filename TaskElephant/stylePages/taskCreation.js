import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colorChoice from "./Colors";
const tskCreation = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorChoice.White,
      alignItems: 'center',
      justifyContent: 'flex-start',

    },
  
    textInput:{
      height: 50,
      fontSize: 20,
      borderWidth:1,
      padding:10,
      paddingBottom:20,
      margin:10,
      width: Platform.OS === 'ios' ? 400 : 375,
      borderRadius:10
      
    },
  
    buttonView:{
      marginTop:125,
      fontSize:40,
      overflow:"hidden",
      borderRadius:10,
      backgroundColor:colorChoice.Primary
    },
    
    defaultPicker:{
       width: 200,
       height: 50,
       borderRadius:10
       
    },
  
    list:{
      marginTop:0,
      borderRadius:10,
      backgroundColor:'#0000FF'
    },
  
    
  });
  export default tskCreation;