import {
  LOGIN_SUCCESS,
  PERMISSIONS_SUCCESS,
  REQUEST_ERROR,
  TOKEN_FOUND,
  GOOD_LOGIN_ERROR,
  REQUEST_SUCCESS,
    SET_ACTIVE_MIGRATION,
    SET_CURRENT_STORE_ID
} from "../actions/types";
import {SET_MIGRATES} from "../../personal/actions/types";

const defaultStatus = {
  token: null,
  permissions: null,
  errorStatus: null,
  errorStatusText: null,
  loginError: "",
  requestSuccess: false,
  migrates: [],
  activeMigration: null,
  storeId: null,
  username: 'Нет',
};

const status = (state = defaultStatus, action) => {
  switch (action.type) {
    case TOKEN_FOUND:
      return {
        ...state,
        token: action.token
      };

    case SET_ACTIVE_MIGRATION:
      return {
        ...state,
        activeMigration: action.migrate,
      };

    case GOOD_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.text,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        requestSuccess: action.isSuccess,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        permissions: action.payload.permissions,
        username: action.payload.name,
        requestSuccess: true,
      };

    case REQUEST_ERROR:
      alert(action.error.errorText);
      return {
        ...state,
        requestSuccessful: false,
        errorStatus: action.error.errorStatus,
        errorStatusText: action.error.errorText,
      };

    case PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.payload,
        username: action.name
      };

    case SET_MIGRATES:
      return {
        ...state,
        migrates: action.migrates,
      };

    case SET_CURRENT_STORE_ID:
      return {
        ...state,
        storeId: action.storeId,
      };

    default:
      return state;
  }
};

export default status;
