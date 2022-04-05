import { StyleSheet } from "react-native";

const createStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(115,162,243,.9)',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    
      textInput:{
        height: 50,
        fontSize: 20,
        borderWidth:1,
        padding:10,
        margin:10,
        width: Platform.OS === 'ios' ? 400 : 375,
        backgroundColor:'#ededed',
        borderRadius: 3,
        elevation:8,
        
      },
    
      buttonView:{
        marginTop:125,
        fontSize:40
      },
      
      defaultPicker:{
         width: 200,
         height: 50,
         backgroundColor:'#ededed',
         marginBottom:0,
         
         
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
        fontWeight:'bold'
      }
    
});

export default createStyle;