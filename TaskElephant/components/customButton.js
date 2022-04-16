import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import styleButton from "../styling/buttonStyle";
import deleteButton from "../styling/DeleteB";

const CustomButton = ({onPress, title,page, energycheck}) => (
    <TouchableOpacity onPress={onPress} style={page == 'delete'? deleteButton.customButtonContainer : styleButton.customButtonContainer || energycheck =='true'? styleButton.energyButtonContainer:styleButton.customButtonContainer}>
        <Text style={styleButton.customButtonText}>{title}</Text>
    </TouchableOpacity>
)
export default CustomButton;
