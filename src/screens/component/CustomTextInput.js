import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { s, ms } from 'react-native-size-matters';

const CustomTextInput = ({ label, iconComponent, secureTextEntry, onChangeText, value, placeholder }) => {
    return (
        <View style={{ marginBottom: s(15) }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {iconComponent &&
                    React.cloneElement(iconComponent, {
                        size: s(25),
                        color: "#d4d4d4",
                        style: { marginRight: s(10) }
                    })
                }
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#414a5e"
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: "gray",
        marginBottom: s(5),
        fontSize: s(12),
        marginLeft: s(5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: s(1),
        borderRadius: s(10),
        padding: ms(10),
        borderColor: "#dedede",
        backgroundColor: "#fafafa",
        height: s(45),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "gray",
        paddingLeft: s(10),
        fontSize: s(15),
    },
});

export default CustomTextInput;
