import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export const changeUserStatus = (status, id) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.post('/api/v0.0/user_status',{status,id}, response => {
        dispatch(getStuff());
    })
};