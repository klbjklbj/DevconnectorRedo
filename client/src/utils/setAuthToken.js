import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply token to every request
    //same as putting token in header in postman
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;
