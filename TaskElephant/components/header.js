import React from 'react';
import {StyleSheet, Text, View,Platform } from 'react-native';
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
        justifyContent: Platform.OS === 'ios'? 'center' : 'flex-start'
    },

    headerText:{
        fontSize: 18,
        fontWeight: Platform.OS === 'ios'? '500' : '600'
    },
    icon:{
        position:'absolute',
        right: Platform.OS === 'ios'? -100 : 0,
        color: Platform.OS === 'ios'? '#007AFF' : '#2D312E'
        
        // '#4A74EF'
    }
});