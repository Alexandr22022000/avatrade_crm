import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export default (data) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.post('/api/v0.0/user', data, (response) => {
        dispatch(getStuff(true));
    })
};