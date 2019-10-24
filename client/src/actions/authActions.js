//write function that triggers dispatch call

import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types"; //bring in dispatcher
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
//dispatch calls need to say 1)the type of dispatch and 2) payload
export const registerUser = (userData, history) => dispatch => {
  //equivalent of postman call
  //when user clicks Signup button
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User
//userData = email and password user enters
export const loginUser = userData => dispatch => {
  //equivalent of postman call
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //***save the token to localstorage (browser)
      //APIs don't have access to redux store
      const { token } = res.data; //deconstruction - same as "const token = res.data.token"
      localStorage.setItem("jwtToken", token); //key and value

      //***set token to auth header
      setAuthToken(token);

      //***Decode token to get user data
      const decoded = jwt_decode(token); //gives back ID, Name Avatar (Passport had created a token from these three)

      //***Store decoded info/user data in redux
      //setCurrentUser has type and payload for dispatch call
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        //need type and payload for dispatch calls
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser=()=> dispatch=>{
  //Remove token from local storage
  localStorage.removeItem('jwtToken');
  //Remove token from auth header
  setAuthToken(false);
  //Clear the user from redux store
  dispatch(setCurrentUser({}));
}