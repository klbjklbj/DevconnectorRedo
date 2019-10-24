import {GET_ERRORS} from '../actions/types';

const initialState={};

//Two parameters are 1) state and 2) action
//return in reducers are sent to store
export default function(state=initialState, action){
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; //write to store (no need to spread errors)
    default:
      return state;  
  }
}