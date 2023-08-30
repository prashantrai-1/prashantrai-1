import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './Home';
import { CustomDrawer } from './CustomDrawer';
import { BottomTab } from './BottomTab';
import { Profile } from './Profile';
const Drawer = createDrawerNavigator();
export function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/>} screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={BottomTab} />
            <Drawer.Screen name="Profile" component={Profile} />
            {/* <Drawer.Screen name="Home" component={BottomTab} options={{ drawerLabelStyle: { color: '#041B3E' } }} /> */}
        </Drawer.Navigator>
    )
}
