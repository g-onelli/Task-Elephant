import { StyleSheet, View , Platform} from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const deleteButton = StyleSheet.create({
    customButtonContainer:{     
        justifyContent:'center',
        alignItems:'center',
        elevation: 8,
        backgroundColor: originalPalette.deleteButtonColor,
        borderRadius: borderStyle.lrgCurve,
        padding:10,
        height:50,
        width:'90%',
        marginBottom:4,
        marginTop:4,
        
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        textTransform:'capitalize',
        letterSpacing: 2,
        fontSize: 22,
        fontWeight:"bold",
        color: originalPalette.white,
        alignSelf: "center",
        textShadowColor: originalPalette.txtShadow,
        textShadowOffset: {width:0.75,height:0.75},
        textShadowRadius: 3,
    },

});
export default deleteButton;
