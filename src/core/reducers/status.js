import {LOGIN_ERROR, LOGIN_SUCCESS, PERMISSIONS_SUCCESS, REQUEST_ERROR, TOKEN_FOUND} from "../actions/types";

const defaultTokenState = {
    token: null,
    permissions: null,
    tokenExists: false,
    loginRequestSuccessful: false,
    errorStatus: null,
    errorStatusText: null
};

const status = (state = defaultTokenState, action) =>{
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
                loginRequestSuccessful: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                token: null,
                tokenExists: false,
                loginRequestSuccessful: false
            };
        case REQUEST_ERROR:
            return {
                ...state,
                tokenExists: false,
                loginRequestSuccessful: false,
                errorStatus: action.error.errorStatus,
                errorStatusText: action.error.errorText
            };
        case PERMISSIONS_SUCCESS:
            return {
                ...state,
                tokenExists: true,
                loginRequestSuccessful: true,
                permissions: action.payload
            };
        default:
            return state;
    }
};

export default status;