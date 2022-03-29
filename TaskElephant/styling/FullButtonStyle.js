import { StyleSheet, View } from "react-native";
import { Platform } from "react-native-web";

const fullButton = StyleSheet.create({
    customButtonContainer:{
        //flex:1,
       // flexDirection:'row',
        //flexWrap:'wrap',
        //position:'relative',      
        justifyContent:'center',
        alignItems:'center',
        elevation: 8,
        backgroundColor: '#ededed',
        padding:10,
        height:30,
        width:'100%',
        marginBottom:4,
        marginTop:4,
        borderColor:'#000',
        borderWidth:2,
        /*
        9D9B9C

        faf9f6
        */
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        textTransform:'capitalize',
        letterSpacing:2,
        fontSize: 20,
        fontWeight:"bold",
        color: '#000',
        alignSelf: "center",
    },
    //
});
export default fullButton;