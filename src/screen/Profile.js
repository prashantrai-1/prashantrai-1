import React, { Component,useRef ,useState} from 'react'
import { Text, View, Image, FlatList, SafeAreaView, RefreshControl, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export function Profile() {
  const navigation = useNavigation()
  let actionSheet = useRef();
  const getUserDetail = useSelector((state) => state?.userDetail)
  console.log("selectordataProfile==>", getUserDetail)
  console.log("selectordataProfile==>", getUserDetail?.profile_pic)
  const[image,setImage]=useState()
  const showActionSheet = () => {
    actionSheet.current.show();
  };
  function imageuploadData(index) {
    if (index == 0) {
      ImagePicker.openPicker({
        width: 100,
        height: 100,
        cropping: false,
      }).then((image) => {
        setImage(image.path)
        // setSelectedImage(image.path);
        console.log(image.path);
        // submit(image.path);
      });
    } else {
      ImagePicker.openCamera({
        width: 100,
        height: 100,
        cropping: false,
      }).then((image) => {
        setImage(image.path)
        // setSelectedImage(image.path);
        console.log(image.path);
        // submit(image.path);
      });
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'purple', padding: 20 }}>
            <Foundation name="graph-horizontal" color={'white'} size={30} onPress={() => { navigation.toggleDrawer() }} />
            <Text style={styles.txt}>Profile </Text>
          </View>
          <View style={{ padding: 30 }}>
            <View style={styles.viewBox}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                <TouchableOpacity onPress={showActionSheet} style={styles.camera}>
                  {image?<Image source={{uri:image}} style={{height:100,width:100,borderRadius:50}}/>:<MaterialIcons name="add-a-photo" color={"black"} size={80} />}
                </TouchableOpacity>
              </View>

              {/* <Image source={{uri:getUserDetail?.profile_pic?getUserDetail?.profile_pic}} style={{height:100,width:100}}/> */}
              <Text style={styles.txtInView}>Name: {getUserDetail?.name}</Text>
              <Text style={styles.txtInView}>Address: {getUserDetail?.address}</Text>
            </View>
          </View>
          <ActionSheet
            ref={actionSheet}
            title={"Which one do you like ?"}
            options={["Gallery", "Camera", "Cancel"]}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={(index) => {
              imageuploadData(index);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
  txt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginLeft: 25
  },
  txtInView: {
    color: '#041B3E',
    fontSize: 16,
    fontWeight: '600'
  },
  viewBox: {
    // backgroundColor:'pink',
    // flexDirection: 'row',
    padding: 15,
    // alignItems:'center',
    // width: "100%",
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 100 },
    // borderRadius: 5,
  },
  camera: {
    // backgroundColor: 'red',
    padding: 10,
    borderRadius:80,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 8,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 100 },
  }
})