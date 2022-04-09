import { StyleSheet } from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const createStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: originalPalette.scheduleTaskItem,
        alignItems: 'center',
        //justifyContent: 'space-around',//flex-start
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
        borderWidth:borderStyle.narrowBorder,
        padding:10,
        margin:10,
        marginBottom:0,
        backgroundColor: originalPalette.inputColor,
        borderRadius: borderStyle.smlCurve,
        elevation:8,
        width: 160,
      },
    
      textInput:{
        height: 50,
        fontSize: 17,
        borderWidth:borderStyle.narrowBorder,
        padding:10,
        margin:10,
        marginBottom: Platform.OS == 'ios' ? 20:10,
        width: Platform.OS === 'ios' ? 400 : 375,
        backgroundColor: originalPalette.inputColor,
        borderRadius: borderStyle.smlCurve,
        elevation:8,
        letterSpacing: 2,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        
      },
    
      buttonView:{
        marginTop:200,
        marginBottom:50,
        fontSize:40,
      },
      
      defaultPicker:{
         width: 200,
         height: 50,
         //backgroundColor:'#ededed',
         marginBottom:0,
         letterSpacing: 2,
        
         
      },
    
      list:{
        marginTop:0
      },
     
      Text:{
        backgroundColor: originalPalette.creationTextBackground,
        padding: 5,
        minWidth:'100%',
        margin:20,
        fontSize:17,
        textAlign:'center',
        borderWidth:borderStyle.narrowBorder,
        fontWeight:'bold',
        letterSpacing: 2,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
      },

      secondText:{
        backgroundColor: originalPalette.creationTextBackground,
        padding: 5,
        minWidth:'100%',
        margin:10,
        fontSize:15,
        textAlign:'center',
        borderWidth:borderStyle.narrowBorder,
        fontWeight:'bold',
        letterSpacing: 2,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
      }
    
});

export default createStyle;
