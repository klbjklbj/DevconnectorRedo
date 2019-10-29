import {
  GET_PROFILE, //get user profile
  GET_PROFILES, //get all profiles
  PROFILE_LOADING, //spinner
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true //show spinner
      };
    case GET_PROFILE: //A better name is SET_PROFILE
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES: //A better name is SET_PROFILES
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
     case CLEAR_CURRENT_PROFILE:
       return {
         ...state,
         profile: null
       } 
      default:
        return state; 
  }
}
