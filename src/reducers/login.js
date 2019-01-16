import {SET_LOGIN_INFO} from "../constants";

const defaultTokenState = {token: '', permissions: []};

const login = (state = defaultTokenState, action) =>{
    if(action.type === SET_LOGIN_INFO) {
        return {
            token: action.payload.token,
            permissions: action.payload.permissions
        }
    }
    return state;
};

export default login;