import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';
import { AppNavigator } from '../AppNavigator';

export function RootNavigator() {
    
    return (
        <View style={{flex:1}}>
            <DrawerNavigator/>
        </View>
    )
}
