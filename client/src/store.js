//define how store is created

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers'; //no need to say index.js
import thunk from 'redux-thunk';

const initialState={};
const middleware=[thunk];

//create store
//three parameters 1)reducers that can write to store, 2)initial store data, 3)enhancers
const store=createStore(
  rootReducer,//reducer(s) that can write to store
  initialState, //initial store data
  compose( //compose applies multiple enhancements
    applyMiddleware(...middleware),//enhancers (ex thunking)
    //following is for development mode to make store visible
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  //anytime we put data in store we want the following middleware to kick in
  //... is spread operator
  
);

export default store;