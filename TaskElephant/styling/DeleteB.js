import { StyleSheet, View , Platform} from "react-native";


const deleteButton = StyleSheet.create({
    customButtonContainer:{     
        justifyContent:'center',
        alignItems:'center',
        elevation: 8,
        backgroundColor: '#FE4643',
        borderRadius: 10,
        padding:10,
        height:50,
        width:'90%',
        marginBottom:4,
        marginTop:4,
        
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        textTransform:'capitalize',
        letterSpacing:2,
        fontSize: 22,
        fontWeight:"bold",
        color: '#fff',
        alignSelf: "center",
        textShadowColor:"#808080",
        textShadowOffset: {width:0.75,height:0.75},
        textShadowRadius: 3,
    },

});
export default deleteButton;
