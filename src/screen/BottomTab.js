import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { DrawerNavigator } from './DrawerNavigator';
import { Profile } from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome'
const Tab = createBottomTabNavigator();
export function BottomTab() {
    return (
        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "#757588",
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600"
              },
          })}>
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen name="Nearest users" component={Home} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="users" color={color} size={30} />
                ),
            }} />
        </Tab.Navigator>
    )
}
