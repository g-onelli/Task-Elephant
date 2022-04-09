import { StyleSheet, View, Platform } from "react-native";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const welcomeStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: originalPalette.white,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: originalPalette.genSheetBackground,
    },
    topSentence:{
        fontSize:35,
        marginBottom:0,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        letterSpacing: 2,
    },
    name : {
        marginBottom:100,
        fontSize:35,
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        letterSpacing: 2,
    },

    button:{
        marginTop : 100,
        height:280
    },
    button1:{
        alignSelf: 'flex-end',
        marginTop : 200,
        width:10,
        fontSize:10
    },

  });

  export default welcomeStyle;
