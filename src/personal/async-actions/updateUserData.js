import HTTPS from "../../core/HTTPS";
import {getStuff} from "./getStuff";

export default (data) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/user', data, dispatch, getState)
        .then(() => dispatch(getStuff(getState().stuff.showAll)));
};