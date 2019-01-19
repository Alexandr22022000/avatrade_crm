import {PERMISSIONS_SUCCESS} from "./types";

export const permissionsSuccess = (permissions)=> ({
    type: PERMISSIONS_SUCCESS,
    payload: permissions
});
