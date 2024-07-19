import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../Auth/Login';
import LoginPage from '../../Auth/LoginPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="Login"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AuthStack

