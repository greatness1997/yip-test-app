import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageSqm, backgroundImage } from "../../assets/exports";
import { s } from "react-native-size-matters";


const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.3)']}
                    locations={[0.3, 1]}
                    style={styles.gradient}
                >

                    <View style={[styles.textContainer]}>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>I have an account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageContainer: {
        position: "absolute",
        top: s(10),
        left: s(10),
    },
    imageSqm: {
        resizeMode: "contain",
        width: s(70),
        height: s(70),
    },
    textContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: s(10),
        paddingBottom: s(20),
    },
    buttons: {
        padding: s(10),
        marginTop: s(40)
    },
    nextButton: {
        width: "100%",
        height: s(45),
        backgroundColor: "green",
        borderRadius: s(10),
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default Login;
