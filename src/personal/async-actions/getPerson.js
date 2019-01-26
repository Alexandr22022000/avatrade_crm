import HTTPS from "../../core/HTTPS";
import {personResponse} from "../actions/personResponse";

export const getPerson = (id) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    console.log(`getPerson ${HTTPS}`);
    HTTPS.get('/api/v0.0/user', {id}, (response) => {
        dispatch(personResponse(response));
    });
};