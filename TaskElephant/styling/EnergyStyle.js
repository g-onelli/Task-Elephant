import { StyleSheet, Platform } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const energyCSS = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'rgba(115,162,243,.3)',
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
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
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
