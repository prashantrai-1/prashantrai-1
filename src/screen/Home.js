import React, { useEffect, useState, memo } from "react";
import { Text, View, Image, FlatList, SafeAreaView, RefreshControl, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ShopAction } from '../action/ShopAction';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from 'react-native-vector-icons/Foundation'
import { useNavigation } from "@react-navigation/native";
import { getDistance, Geolib } from 'geolib';
import { locationsData } from "../constant";
const compareLocations = (latitude, longitude, locations) => {
  const currentLocation = { latitude, longitude };
  const closeLocations = [];

  locations.forEach((location) => {
    const { lat, long } = location;

    // Calculate the distance between the current location and each location in the locationsData array
    const distance = getDistance(currentLocation, { latitude: lat, longitude: long });

    // Define a threshold distance, such as 1000 meters
    const thresholdDistance = 1000;

    // If the distance is below the threshold distance, add the location to the closeLocations array
    if (distance <= thresholdDistance) {
      closeLocations.push(location);
    }
  });

  return closeLocations;
};
export function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isFocus, setIsFocus] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userDetailData, setUserDetailData] = useState()
  const getUserDetail = useSelector((state) => state?.userDetail)
  console.log("selectordata==>", getUserDetail)
  const currentLatitude = getUserDetail?.lat; // Example current latitude
  const currentLongitude = getUserDetail?.long; // Example current longitude

  const closeLocations = compareLocations(currentLatitude, currentLongitude, locationsData);
  useEffect(() => {
    console.log("enterhome==>")
    findNearestLocation();
    // dispatch(ShopAction())
  }, [isRefreshing]);
  const findNearestLocation = (latitude, longitude, locationsData) => {
    // Create an array to store the distances
    const distances = [];
    if (Array.isArray(locationsData)) {
      // Perform your logic here
      console.log("yes")
    } else {
      console.log("no")
      // Handle the case when locationsData is not an array
    }
    // Iterate over each location in the locationsData array
    // locationsData.map((location) => {
    //   // Calculate the distance between the given coordinates and each location
    //   const distance = Geolib.getDistance(
    //     { latitude, longitude },
    //     { latitude: location.lat, longitude: location.long }
    //   );

    //   // Add the distance and the location to the distances array
    //   distances.push({ distance, location });
    // });

    // // Sort the distances array in ascending order based on the distance
    // distances.sort((a, b) => a.distance - b.distance);

    // // Return the nearest location
    // console.log("datanearest==>",distances[0].location)
    // return distances[0].location;
  };
  function showModalDetail(user) {
    console.log("userget==>", user)
    setUserDetailData(user)
    setIsFocus(true)

  }

  const renderModalShow = () => {
    return (
      <View>
        <Modal visible={isFocus} animationType="slide" transparent={true} >
          <View style={styles.headModal}>
            <View style={{ backgroundColor: 'white', height: '50%', width: '80%', borderRadius: 10, padding: 20 }}>
              <View style={{ justifyContent: 'flex-end', alignItems: "flex-end", marginBottom: 5 }}>
                <Ionicons
                  name="close"
                  size={25}
                  color={"#041B3E"}
                  onPress={() => setIsFocus(false)}
                />
              </View>

              <View style={styles.heading}><Text style={styles.txt}>User Detail !</Text></View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image
                    style={{ width: 50, height: 50, marginRight: 10 }}
                    source={{ uri: userDetailData?.profile_pic }}
                  />
                </View>
                <View style={{flex:1}}>
                  <Text style={[styles.txtlist, { marginTop: 3 }]}>Name : {userDetailData?.name}</Text>
                  <Text style={[styles.txtlist, { marginTop: 3 }]}>Email : {userDetailData?.email}</Text>
                  <Text style={[styles.txtlist, { marginTop: 3 }]}>Phone no: {userDetailData?.contact}</Text>
                  <Text style={styles.txtlist}>Address : {userDetailData?.address}</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const UserItem = memo(({ user }) => {
    return (
      <TouchableOpacity style={styles.listView} onPress={() => showModalDetail(user)}>
        <View style={{ marginRight: 10 }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: user?.profile_pic }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.txtlist, { marginTop: 3 }]}>Name : {user?.name}</Text>
          <Text style={[styles.txtlist, { marginTop: 3 }]}>Email : {user?.email}</Text>
          <Text style={[styles.txtlist, { marginTop: 3 }]}>Phone no: {user?.contact}</Text>
          <Text style={styles.txtlist}>Address : {user?.address}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  const fetchData = () => {
    setTimeout(() => {
      // dispatch(ShopAction())
      setIsRefreshing(false);
    }, 2000);
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };
  return (
    // <View>
    //   {closeLocations.map((location) => (
    //     <View key={location.id}>
    //       <Text>{location.name}</Text>
    //       <Text>{location.address}</Text>
    //       {/* Render other location data */}
    //     </View>
    //   ))}
    // </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', backgroundColor: 'purple', padding: 20 }}>
        <Foundation name="graph-horizontal" color={'white'} size={30} onPress={() => { navigation.toggleDrawer() }} />
        <Text style={[styles.txt, { marginLeft: 25 }]}>Nearest Users</Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={closeLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserItem user={item} />}
          style={{ padding: 20 }}
          ListFooterComponent={<View style={{ height: 50 }} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
      {renderModalShow()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "purple",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  viewBox: {
    // backgroundColor:'pink',,
    flexDirection: 'row',
    // padding: 15,
    width: "100%",
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 100 },
    // backgroundColor: 'red',
    //  margin: 5, 
    // flexDirection: 'row'
  },
  listView: {
    flexDirection: 'row',
    margin: 3,
    marginVertical: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    borderRadius: 10,
    padding: 20
  },
  txtlist: {
    color: '#041B3E',
    fontSize: 16,
    fontWeight: '600'
  },
  headModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: "center",
    alignItems: 'center'
  },
  heading: {
    backgroundColor: 'purple',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10
  }
})