import {LOGIN_ERROR, LOGIN_SUCCESS, REQUEST_ERROR, TOKEN_FOUND, TOKEN_NOT_FOUND} from "../actions/types";

const defaultTokenState = {
    token: '',
    permissions: [],
    loginSuccessful: true,
    errorStatus: null,
    errorStatusText: null
};

const status = (state = defaultTokenState, action) =>{
    console.log(action);
    switch (action.type) {
        case TOKEN_FOUND:
            return {
                ...state,
                token: action.payload.token
            };
        case TOKEN_NOT_FOUND:
            return{
                ...state,
                loginSuccessful: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                permissions: action.payload.permissions,
                loginSuccessful: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginSuccessful: false
            };
        case REQUEST_ERROR:
            return {
                ...state,
                loginSuccessful:false,
                errorStatus: action.error.errorStatus,
                errorStatusText: action.error.errorStatusText
            };
        default:
            return state;
    }
};

export default status;