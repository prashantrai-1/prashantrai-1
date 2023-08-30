import React, { Component,useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity ,Modal,ActivityIndicator} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerNavigator } from './DrawerNavigator';
import { locationsData } from '../constant';
import { useDispatch } from 'react-redux';
import { storeDataDetail } from '../action/ShopAction';
export function Register({navigation}) {
  const [isFocus, setIsFocus] = useState (false)
  const transparent = 'rgba(0,0,0,0.5)'
  const dispatch=useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("register", values);
    setIsFocus(true)
    const user = locationsData.find((user) => user?.email == values?.email);
    console.log("users==>",user)
    if (user) {
      // Authentication successful
      setTimeout(() => {
        storeData(values?.email)
        dispatch(storeDataDetail(user))
        setIsFocus(false)
        Toast.show("User Signup successfully.")
        navigation.replace("Root")
      }, 3000)
    } else {
      setTimeout(() => {
        setIsFocus(false)
        Toast.show("Please enter valid credentials.")
      }, 3000)
    }
    //   navigation.navigate("Root")
    },
  });
  
  const storeData = async (email) => {
    const getEmail = await AsyncStorage.getItem('key');
    console.log("storeemail===>", email)
    await AsyncStorage.setItem('key', email);
  }

  const modalRender = () => {
    return (
      <View>
        <Modal visible={isFocus} animationType="slide" transparent={true} >
          <View style={{ flex: 1, backgroundColor: transparent, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='white' size="large" />
          </View>
        </Modal>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.topView}>
            <Text style={styles.txt}>Welcome to Register !</Text>
          </View>
          <View style={{ paddingLeft: 30, paddingRight: 30 }} >
            <Text>Email</Text>
            <TextInput
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={styles.viewBox}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errortxt}>{formik.errors.email}</Text>
            )}

            <Text>Password</Text>
            <TextInput
              style={styles.viewBox}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errortxt}>{formik.errors.password}</Text>
            )}

            <Text>Confirm Password</Text>
            <TextInput
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              value={formik.values.confirmPassword}
              secureTextEntry
              style={styles.viewBox}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text style={styles.errortxt}>{formik.errors.confirmPassword}</Text>
            )}
            <TouchableOpacity onPress={formik.handleSubmit} style={styles.loginbtn}>
              <Text style={styles.txt} >Register</Text>
            </TouchableOpacity>
          </View>
          {modalRender()}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({

  topView: {
    height: '30%',
    backgroundColor: "purple",
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 40,
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
    marginBottom: 20
  },
  errortxt: {
    color: 'red',
    marginTop: 3
  },
  loginbtn: {
    backgroundColor: "purple",
    padding: 15,
    marginTop: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
});