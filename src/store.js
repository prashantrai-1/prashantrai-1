
// store.js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { ShopReducer } from "./reducer/ShopReducer";

const store = createStore(ShopReducer, applyMiddleware(thunkMiddleware));

export default store;
