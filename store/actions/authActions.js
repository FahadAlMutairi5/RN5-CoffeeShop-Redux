import axios from "axios";
import jwt_decode from "jwt-decode";
import {AsyncStorage} from 'react-native';
import * as actionTypes from "../actions/types";

const instance = axios.create({
  baseURL: "http://coffee.q8fawazo.me/api/"
});
    /* -- set Token to brow -- */
const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    //this line will put the token in the code format
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
}; 
  /* -- check for expired token -- */
export const checkForExpiredToken =  () => {
  return async dispatch => {
    // Get token
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};
  /* -- login from api -- */
export const login = (userData, navigate) => {
  return async dispatch => {
    try {
      let response = await instance.post("login/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      dispatch({
       type: actionTypes.SET_ERROR,
       payload: []
     });
     navigate.navigate("Profile");
    } catch (error) {
      console.log(error.response.data)
      dispatch({
       type: actionTypes.SET_ERROR,
       payload: error.response.data
     });
    }
  };
};
        /* -- signup from api -- */
export const signup = (userData, navigate) => {
  return async dispatch => {
    try {
      let response = await instance.post("register/", userData);
      let user = response.data;
      dispatch(login(user))
      dispatch({
       type: actionTypes.SET_ERROR,
       payload: []
     });
     navigate.replace("Profile");
    } catch (error) {
      console.log(error.response.data)
      dispatch({
       type: actionTypes.SET_ERROR,
       payload: error.response.data
     });
    }
  };
};

//will delete the whole user obj
export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};
/* -- set current user to see -- */
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
