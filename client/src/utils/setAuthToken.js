//this file puts token in every header


import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply to every request (same as putting token in authorization header in postman)
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;