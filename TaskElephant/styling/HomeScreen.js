import { StyleSheet, View, Platform } from "react-native";



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
        marginBottom:0,
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
    },
    name : {
        marginBottom:100,
        fontSize:35,
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
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
