import { StyleSheet } from "react-native";

const scheduleSheet =(taskCheck)=> StyleSheet.create({
    container: {
        marginTop:0,
        flex:1,
        backgroundColor: "rgba(115,162,243,.3)",
      },
    
    content: {
        flex:1,
        padding:40,
        
        
      },
    list:{
        marginTop:10
      },
    
    button:{
        marginBottom:20
      },
    
    empty:{
        // flex:1,
        // alignItems: 'center',
        // justifyContent: 'center'
    
        justifyContent:'center',
        alignItems: 'center',
        top: '40%', left: 0, 
        right: 0, bottom: 0, 
        
      },
    
    startText: {
        color: '#000',
        fontSize: 18,
        //fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        letterSpacing: 2,
        textTransform:'capitalize',
    },
    
    scheduleItem:{
        padding:16,
        marginTop:16,
        borderColor: "#000",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        textAlign:'center',
        fontWeight:'bold',
        letterSpacing:2,
        backgroundColor: taskCheck != null? "rgba(115,162,243,.9)":"rgba(250,131,50,0.80)",
      },  
    
    item:{
        backgroundColor: "rgba(225,225,225,0.3)",
        color: "rgba(0,0,0,0.5)",
    
        padding:16,
        marginTop:16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        textAlign:'center'
      }
})

export default scheduleSheet;
