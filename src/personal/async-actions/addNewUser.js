import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export const addNewUser = (userData) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.post('/api/v0.0/add_user', userData, (response) => {
        dispatch(getStuff());
    })
};