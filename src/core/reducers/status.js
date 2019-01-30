import {LOGIN_ERROR, LOGIN_SUCCESS, PERMISSIONS_SUCCESS, REQUEST_ERROR, TOKEN_FOUND} from "../actions/types";

const defaultStatus = {
    token: null,
    permissions: null,
    tokenExists: false,
    requestSuccessful: false,
    errorStatus: null,
    errorStatusText: null
};

const status = (state = defaultStatus, action) =>{
    switch (action.type) {
        case TOKEN_FOUND:
            return{
                ...state,
                token: action.token,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                permissions: action.payload.permissions,
                tokenExists: true,
                requestSuccessful: true
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
        default:
            return state;
    }
};

export default status;