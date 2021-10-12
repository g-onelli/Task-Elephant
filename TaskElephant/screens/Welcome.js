import React from 'react';

import { StyleSheet, View, Text,Button } from 'react-native';

export default function Welcome({navigation}){




    const pressHandler = () => {
        navigation.navigate('Create');
    }

    




    return (


        <View style = {styles.container}>
            <Text style = {
                {
                    padding:20
                }
            }>
                Welcome to
            </Text>

            <Text style = {styles.name}>
                Task Elephant
            </Text>


            <Button title = 'Create a task' onPress = {pressHandler} style = {styles.button}>

            </Button>

            


        </View>
    )
        

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    name : {
        // padding: 70,
        marginBottom:180,
        fontSize:35,
    },


    button:{
        marginTop : 190,

        // position : 'absolute',
        // padding: 50,
        height:280
    },


  });


// const styles = StyleSheet.create({
//     container : {
//         padding: 24
//     }
// });