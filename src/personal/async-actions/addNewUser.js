import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export const addNewUser = (userData) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/add_user', userData, dispatch, getState)
        .then((response) => dispatch(getStuff()));
};