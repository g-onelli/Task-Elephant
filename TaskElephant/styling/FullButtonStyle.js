import { StyleSheet, View , Platform} from "react-native";

const fullButton = StyleSheet.create({
    customButtonContainer:{      
        justifyContent:'center',
        alignItems:'center',
        elevation: 8,
        backgroundColor: '#ededed',
        padding:10,
        height: Platform.OS=='ios'? 40:30,
        width:'100%',
        marginBottom:4,
        marginTop:4,
        borderColor:'#000',
        borderWidth:2,
    },
    customButtonText: {
        fontFamily: Platform.OS == 'ios'? 'Verdana': 'sans-serif',
        textTransform:'capitalize',
        letterSpacing:2,
        fontSize: 15,
        fontWeight:"bold",
        color: '#000',
        alignSelf: "center",
    },
    //
});
export default fullButton;
