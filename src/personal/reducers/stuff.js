import {
  SET_CURRENT_USER,
  SET_USERS,
  SET_EMPTY_USER,
  UPDATE_USER_DATA,
  SET_RANKS,
  DEL_CURRENT_USER,
} from "../actions/types";

const defaultStuffState = {
  users: [],
  currentUser: null,
  ranks: [],
};

const stuff = (state = defaultStuffState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.stuff.users
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };

    case SET_EMPTY_USER:
      return{
        ...state,
        currentUser: action.user
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.name]: action.data,
        }
      };

    case SET_RANKS:
      return {
        ...state,
        ranks: action.ranks,
      };

    case DEL_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default stuff;
