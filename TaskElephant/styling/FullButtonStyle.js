import { StyleSheet, View , Platform} from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const fullButton = StyleSheet.create({
    customButtonContainer:{      
        justifyContent:'center',
        alignItems:'center',
        elevation: 8,
        backgroundColor: originalPalette.genButtonColor,
        padding:10,
        height: Platform.OS=='ios'? 40:30,
        width:'100%',
        marginBottom:4,
        marginTop:4,
        borderColor: originalPalette.black,
        borderWidth:borderStyle.wideBorder,
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        textTransform:'capitalize',
        letterSpacing: 2,
        fontSize: 15,
        fontWeight:"bold",
        color: originalPalette.black,
        alignSelf: "center",
    },
    //
});
export default fullButton;
