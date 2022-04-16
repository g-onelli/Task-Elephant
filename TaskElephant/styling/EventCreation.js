import { StyleSheet, Platform } from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const eventStyle = StyleSheet.create({
    container: {
        backgroundColor: originalPalette.eventBackground,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },

      childContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        margin:10,
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
        letterSpacing: 2,
      },
    
      textInput:{
        height: 50,
        fontSize: 20,
        borderWidth:borderStyle.narrowBorder,
        padding:10,
        margin:10,
        width: Platform.OS === 'ios' ? '90%' : 375,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        backgroundColor: originalPalette.inputColor,
        color: originalPalette.black,
        borderRadius: borderStyle.smlCurve,
        elevation:8,
        letterSpacing: 2,
      },
    
      buttonView:{
        marginTop:175,
        marginBottom:100,
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
        backgroundColor: originalPalette.creationTextBackground,
        padding: 5,
        minWidth:'100%',
        margin:15,
        fontSize:20,
        textAlign:'center',
        borderWidth:borderStyle.narrowBorder,
        color: originalPalette.black,
        fontWeight:'bold',
        letterSpacing: 2,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
      },
      secondText:{
        backgroundColor:originalPalette.creationTextBackground,
        padding: 10,
        minWidth:'100%',
        margin:10,
        fontSize:15,
        textAlign:'center',
        borderWidth: borderStyle.narrowBorder,
        fontWeight:'bold',
        letterSpacing: 2,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
      }
    
});

export default eventStyle;
