import {SET_PERMISSIONS} from "../constants";

const defaultPermissionState = [];

const permission = (state = defaultPermissionState, action) => {
    if(action.type === SET_PERMISSIONS) {
        return{
            permission: action.payload
        }
    }
    return state;
};

export default permission;