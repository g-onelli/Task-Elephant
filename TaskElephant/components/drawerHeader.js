import React from 'react';
import {StyleSheet, Text, View,Platform } from 'react-native';
import {MaterialIcons} from  '@expo/vector-icons';


export default function DrawerHeader({navigation, title}){



    function press2(){
        navigation.openDrawer();
    }

    return (
        <View style = {styles.header}>

        
            <MaterialIcons name = 'menu' size = {30} style = {styles.menuIcon} onPress={press2}/>


            <View>
                <Text style = {styles.headerText}>{title}</Text>
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
       justifyContent: Platform.OS === 'ios'? 'center' : 'flex-start',
        padding: 10,
       justifyContent: 'center'
    },

    headerText:{
        fontSize: 18,
        fontWeight: Platform.OS === 'ios'? '500' : '600'
    },
    

    menuIcon: {
        position: 'absolute',
        left: Platform.OS === 'ios'? -70 : 0,
        color: Platform.OS === 'ios'? '#007AFF' : '#2D312E'
    }


});