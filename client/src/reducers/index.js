//root reducer, combine all reducers into this reducer

import { combineReducers } from "redux";
import authReducer from './authReducer';


export default combineReducers({
  auth: authReducer
})