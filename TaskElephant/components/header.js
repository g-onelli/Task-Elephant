import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {MaterialIcons} from  '@expo/vector-icons';


export default function Header({navigation}){



    function press() {
        navigation.navigate('Create');
    }


    return (
        <View style = {styles.header}>

            <MaterialIcons name = 'add' size = {30} style = {styles.icon} onPress = {press}/>
            <View>
                <Text style = {styles.headerText}>Your Tasks</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerText:{
        fontSize: 18,
        fontWeight: '500'
    },
    icon:{
        position:'absolute',
        right:-100,
        color:'#007AFF'
        
        // '#4A74EF'
    }
});