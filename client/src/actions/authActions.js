//write function that triggers dispatch call

import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types"; //bring in dispatcher
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

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

export const loginUser = userData => dispatch => {
  //equivalent of postman call
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //***save token to localstorage (browser)
      const { token } = res.data; //deconstruction: same as "const token = res.data.token"
      localStorage.setItem("jwtToken", token); 
      //***set token to auth header
      setAuthToken(token);
      //***Decode token to get user data
      const decoded = jwt_decode(token); //id, name, avatar that we used to create token with passport
      //***Store user data in redux
      dispatch(setCurrentUser(decoded)); //setCurrentUser function already has type and payload      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = (decoded)=>{
  return{
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser=()=>dispatch=>{
  //Remove token from localstorage
  localStorage.removeItem('jwtToken');
  //Removetoken from auth header
  setAuthToken(false);
  //Clear the redux store
  dispatch(setCurrentUser({}));
}