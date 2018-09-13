import * as actionTypes from '../constants';

const initialState = {"account":1, "password":""};
export default function userUpdate(state=initialState,action){
  switch(action.type){
    case actionTypes.USER_LOGIN:{
      return action.data;
    }
    case actionTypes.USER_LOGOUT:{
      return {"account": "", "password":""};
    }
    default:
      return state;
  }
}
