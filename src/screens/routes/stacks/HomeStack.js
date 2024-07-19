import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../mainScreens/HomeScreen';
import AddItem from '../../mainScreens/AddItem';
import ItemDetails from '../../mainScreens/ItemDetails';



const Stack = createNativeStackNavigator();

const HomeStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeStack

