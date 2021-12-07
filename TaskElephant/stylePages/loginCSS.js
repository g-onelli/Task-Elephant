import { StyleSheet } from "react-native";
const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name : {
      // padding: 70,
      marginBottom:180,
      fontSize:30,
  },

  button:{
      marginTop : 190,

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

export default loginStyle;