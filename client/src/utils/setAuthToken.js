import axios from "axios";

<<<<<<< HEAD
const setAuthToken = token => {
  if (token) {
    //Apply token to every request
    //same as putting token in header in postman
=======
//this file puts token in every header

const setAuthToken = token => {
  if (token) {
    //Apply to every request
>>>>>>> play
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> play

export default setAuthToken;
