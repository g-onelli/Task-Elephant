import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import fullButton from "../styling/FullButtonStyle";

const FButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={fullButton.customButtonContainer}>
        <Text style={fullButton.customButtonText}>{title}</Text>
    </TouchableOpacity>
)
export default FButton;
