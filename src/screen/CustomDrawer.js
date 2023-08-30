import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from 'react-redux';
import { logout } from '../action/ShopAction';
import { useNavigation } from '@react-navigation/native';
export function CustomDrawer() {
  const dispatch=useDispatch()
  const navigation=useNavigation()

  const logoutBtn=()=>{
    dispatch(logout(navigation))
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={logoutBtn} style={{ backgroundColor: 'purple' ,padding:20,borderRadius:50}}>
        <AntDesign name="logout"
          size={25}
          color={"white"}
        />
      </TouchableOpacity>
      <Text style={{
        color: '#041B3E',
        fontSize: 16,
        fontWeight: '600'
      }}>Logout</Text>
    </View>
  )
}
