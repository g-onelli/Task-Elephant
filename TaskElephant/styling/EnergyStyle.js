import { StyleSheet, Platform } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const energyCSS = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: originalPalette.genSheetBackground,
    },
    container_slider:{
      flex: 1,
      marginTop: -100,
      marginLeft: 75,
      marginRight: 75,
      alignItems: 'stretch',
      justifyContent: 'center',
      
     //
    },
    name : {
        marginBottom:10,
        fontSize:22,
        padding:10, 
        textAlign:'center',
        fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
        letterSpacing: 2,
    },

    Slider:{

        height:200,
    },
    button:{
        marginTop : 190,
        height:280
    },


  });

  export default energyCSS;
