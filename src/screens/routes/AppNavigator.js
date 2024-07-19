import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import { useAuth } from '../Auth/AuthContext';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const {token} = useAuth()

    return (
        <Stack.Navigator
            initialRouteName="Login"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >

            {token === null ? <Stack.Screen name="Login" component={AuthStack} />
            : <Stack.Screen name="Home" component={HomeStack} />}
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

