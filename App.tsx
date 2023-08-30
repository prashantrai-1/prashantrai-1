import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./src/AppNavigator";
import store from "./src/store";
import { BottomTab } from "./src/screen/BottomTab";
import 'react-native-gesture-handler';
import { DrawerNavigator } from "./src/screen/DrawerNavigator";
import { RootNavigator } from "./src/screen/RootNavigator";
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
 
  return (
    <Provider store={store}>
       <AppNavigator/>
    </Provider>
  );
};

export default App;
