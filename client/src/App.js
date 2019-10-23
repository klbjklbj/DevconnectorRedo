import React from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from 'react-redux'; //for store
import store from './store';

function App() {
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

export default App;
