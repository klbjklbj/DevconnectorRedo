//reducer for writing authentication info into store
 
import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState={
  isAuthenticated: false,
  user:{}
};


//reducer has two parts 1)data 2)action (function) it needs to fire
//action comes with 1)type and 2)payload
export default function(state=initialState, action){
  switch (action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), //isAuthenticated true
        user: action.payload //written to store
      };
    default:
      return state; //write current state info to store
  }
}