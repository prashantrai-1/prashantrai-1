import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export function SplashScreen({ navigation }) {
   
    const getUserDetail = useSelector((state) => state?.userDetail)
    console.log("selectordataProfile==>", getUserDetail)
    useEffect(() => {
        storeData()
        navigation.replace('Login');
    }, []);
    const storeData = async() => {
        const getEmail = await AsyncStorage.getItem('key');
        console.log("storeemail===>", getEmail)
        if (getUserDetail) {
            console.log("okgetemail===>", getEmail)
            setTimeout(() => {
                navigation.replace("Root")
            }, 3000);
        }
        else {
            setTimeout(() => {
                navigation.replace('Login');
            }, 3000);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.spalshtxt}> Splash Screen ! </Text>
            <Text style={styles.txt}> Shopping App </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    txtlist: {
        color: '#041B3E',
        fontSize: 25,
        fontWeight: '600'
    },
    spalshtxt: {
        fontSize: 30,
        fontWeight: '700',
        color: 'purple'
    }
});
