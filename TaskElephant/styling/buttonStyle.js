import { Platform, StyleSheet, View } from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const styleButton = StyleSheet.create({
    customButtonContainer:{
        //flex:1,
       // flexDirection:'row',
        //flexWrap:'wrap',
        //position:'relative',      
        justifyContent:'center',
 //       alignItems:'center',
        elevation: 8,
        backgroundColor: originalPalette.white,
        borderRadius: borderStyle.lrgCurve,
        padding:10,
        //height:50,
        width: Platform.OS == 'ios' ? 300 : '90%',
        marginBottom:10,
        marginTop:4,
        borderWidth:borderStyle.wideBorder,
        
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        textTransform:'capitalize',
        letterSpacing: 2,
        fontSize: 22,
        fontWeight:"bold",
        color: originalPalette.black,
        textAlign: "center",
    },

});
export default styleButton;
