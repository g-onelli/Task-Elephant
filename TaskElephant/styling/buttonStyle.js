import { Platform, StyleSheet, View } from "react-native";


const styleButton = StyleSheet.create({
    customButtonContainer:{
        //flex:1,
       // flexDirection:'row',
        //flexWrap:'wrap',
        //position:'relative',      
        justifyContent:'center',
 //       alignItems:'center',
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding:10,
        //height:50,
        width: Platform.OS == 'ios' ? 300 : '90%',
        marginBottom:10,
        marginTop:4,
        borderWidth:2,
        
    },
    customButtonText: {
        //fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        textTransform:'capitalize',
        letterSpacing:2,
        fontSize: 22,
        fontWeight:"bold",
        color: '#000',
        textAlign: "center",
    },

});
export default styleButton;
