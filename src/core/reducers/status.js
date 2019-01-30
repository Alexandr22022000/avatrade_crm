import {
  EMAIL_ACCEPTED,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  NEW_PASSWORD_ACCEPTED,
  PERMISSIONS_SUCCESS,
  REQUEST_ERROR,
  TOKEN_FOUND,
  GOOD_LOGIN_ERROR,
  REQUEST_SUCCESS,
} from "../actions/types";

const defaultStatus = {
  token: null,
  permissions: null,
  tokenExists: false,
  requestSuccessful: false,
  errorStatus: null,
  errorStatusText: null,
  loginError: "",
  requestSuccess: false,
};

const status = (state = defaultStatus, action) => {
  switch (action.type) {
    case TOKEN_FOUND:
      return {
        ...state,
        token: action.token
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
        tokenExists: true,
        requestSuccessful: true,
        errorStatus: null,
        errorStatusText: null
      };

    case LOGIN_ERROR:
      return {
        ...state,
        token: null,
        tokenExists: false,
        requestSuccessful: false
      };

    case REQUEST_ERROR:
      return {
        ...state,
        tokenExists: false,
        requestSuccessful: false,
        errorStatus: action.error.errorStatus,
        errorStatusText: action.error.errorText
      };

    case PERMISSIONS_SUCCESS:
      return {
        ...state,
        tokenExists: true,
        requestSuccessful: true,
        permissions: action.payload
      };

    case NEW_PASSWORD_ACCEPTED:
      return {
        ...state,
        requestSuccessful: true,
        errorStatus: null,
        errorStatusText: null
      };

    case EMAIL_ACCEPTED:
      return {
        ...state,
        requestSuccessful: true,
        errorStatus: null,
        errorStatusText: null
      };

    default:
      return state;
  }
};

export default status;
