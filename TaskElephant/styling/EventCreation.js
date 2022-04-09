import { StyleSheet, Platform } from "react-native";

const eventStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(250,131,50,0.80)',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },

      childContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        margin:0,
      },

      childInput:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        marginBottom:0,
        backgroundColor:'#ededed',
        borderRadius: 3,
        elevation:8,
        width: 160,
      },
    
      textInput:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        width: Platform.OS === 'ios' ? 400 : 375,
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        backgroundColor:'#ededed',
        color: '#000',
        borderRadius: 3,
        elevation:8,
        
      },
    
      buttonView:{
        marginTop:200,
        marginBottom:50,
        fontSize:40
      },
      
      defaultPicker:{
         width: 200,
         height: 50
         
      },
    
      list:{
        marginTop:0
      },

      Text:{
        backgroundColor:'rgba(237,237,237,.9)',
        padding: 10,
        minWidth:'100%',
        margin:20,
        fontSize:20,
        textAlign:'center',
        borderWidth:1,
        color:'#000',
        fontWeight:'bold'
      },
      secondText:{
        backgroundColor:'rgba(237,237,237,.9)',
        padding: 10,
        minWidth:'100%',
        margin:10,
        fontSize:15,
        textAlign:'center',
        borderWidth:1,
        fontWeight:'bold'
      }
    
});

export default eventStyle;
