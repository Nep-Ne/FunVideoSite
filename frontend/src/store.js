import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
 import Cookie from 'js-cookie';
 import {
   videoListReducer,
  videoDetailsReducer,
  videoSaveReducer,
  videoDeleteReducer,
  videoCommentSaveReducer,
 } from './reducers/videoReducers';
// import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
// import {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderPayReducer,
//   myOrderListReducer,
//   orderListReducer,
//   orderDeleteReducer,
// } from './reducers/orderReducers';

// const cartItems = Cookie.getJSON('cartItems') || [];
 const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  // cart: { cartItems, shipping: {}, payment: {} },
   userSignin: { userInfo },
};
const reducer = combineReducers({
   videoList: videoListReducer,
  videoDetails: videoDetailsReducer,
  // cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  videoSave: videoSaveReducer,
  videoDelete: videoDeleteReducer,
  videoCommentSave: videoCommentSaveReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  // myOrderList: myOrderListReducer,
  // orderList: orderListReducer,
  // orderDelete: orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
