import React, { Component } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux"; //for store
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser,logoutUser } from "./actions/authActions";

//Check for token
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //Decode token and get the user
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user into redux
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime=Date.now()/1000;
  if(decoded.exp<currentTime){
    //logout user
    store.dispatch(logoutUser());
    //Redirect user to login
    window.location.href='/login';
  }
}
class App extends Component {
  render() {
    return (
      //all these componenets can now share store via Provider
      <Provider store={store}>
        {/* wrap everything with routing capabilities */}
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
