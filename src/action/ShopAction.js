import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from 'react-native-simple-toast';
import { Login } from "../screen/Login";
export const SHOPTYPES = {
  FETCH_DATA_REQUEST: "FETCH_DATA_REQUEST",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",
  CLEAR_STORE: "CLEAR_STORE"
};

const shopRequest = () => ({
  type: SHOPTYPES.FETCH_DATA_REQUEST,
  payload: null,
});

const shopSuccess = (user) => ({
  type: SHOPTYPES.FETCH_DATA_SUCCESS,
  payload: { user },
});

const shopError = (error) => ({
  type: SHOPTYPES.FETCH_DATA_FAILURE,
  payload: { error },
});
const clearStore = () => ({
  type: SHOPTYPES.CLEAR_STORE,
  // type:HOMETYPES.CLEARHOME_STORE,
  payload: null,
});
// export const ShopAction = () => async (dispatch) => {
//   console.log("action")
//   dispatch(shopRequest());
//   try {
//     const response = await axios.get('https://api.github.com/users');
//     const data = response.data;
//     console.log("datarecords===>",data)
//     dispatch(shopSuccess(data));
//   } catch (error) {
//     Toast.show(error.message)
//     console.error('API request failed:', error.message);
//     dispatch(shopError(error.message));
//   }

// };

export const storeDataDetail = (reqObj) => async (dispatch) => {
  console.log("action")
  dispatch(shopRequest());
  try {
    dispatch(shopSuccess(reqObj));
  } catch (error) {
    Toast.show(error.message)
    console.error('API request failed:', error.message);
    dispatch(shopError(error.message));
  }
};
export const logout = (navigation) => async (dispatch) => {
  console.log("action")
  dispatch(clearStore());
  navigation.replace("Login")
};