import { Platform, StyleSheet, View } from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const styleButton = StyleSheet.create({
    customButtonContainer:{    
        justifyContent:'center',
        elevation: 8,
        backgroundColor: originalPalette.white,
        borderRadius: borderStyle.lrgCurve,
        padding:10,
        width: '90%',
        margin:0,
        borderWidth:borderStyle.wideBorder,
        alignItems:'center'
        
    },
    energyButtonContainer:{     
        justifyContent:'center',
        elevation: 8,
        backgroundColor: originalPalette.white,
        borderRadius: borderStyle.lrgCurve,
        padding:10,
        width: 300,
        margin:0,
        borderWidth:borderStyle.wideBorder,
        alignItems:'center'
        
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
