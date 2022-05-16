/* eslint-disable no-unreachable */
import {SET_USER} from './types';

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  const {type} = action;

  switch (type) {
    case SET_USER:
      return {...state, user: action.payload};
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
