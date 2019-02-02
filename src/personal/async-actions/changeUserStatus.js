import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export const changeUserStatus = (status, id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/user_status',{status,id}, dispatch, getState)
        .then((response) => dispatch(getStuff()));
};