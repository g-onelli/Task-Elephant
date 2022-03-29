import { StyleSheet, View } from "react-native";
import { Platform } from "react-native-web";


const welcomeStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(115,162,243,.3)',
    },
    topSentence:{
        fontSize:35,
        marginBottom:0
    },
    name : {
        // padding: 70,
        marginBottom:100,
        fontSize:35,
    },

    button:{
        marginTop : 100,

        // position : 'absolute',
        // padding: 50,
        height:280
    },
    button1:{
        alignSelf: 'flex-end',
        marginTop : 200,
        //position : 'absolute',
        //padding: 50,
        //height:10,
        width:10,
        fontSize:10
    },

  });

  export default welcomeStyle;