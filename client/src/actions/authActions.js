//write function that triggers dispatch call

import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types"; //bring in dispatcher

//Register User
//dispatch calls need to say 1)the type of dispatch and 2) payload
export const registerUser = (userData, history) => dispatch => {
  //equivalent of postman call
  //when user clicks Signup button
  axios
    .post("/api/users/register", userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
