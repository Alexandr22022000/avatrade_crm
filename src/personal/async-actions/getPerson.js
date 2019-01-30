import HTTPS from "../../core/HTTPS";
import {setCurrentUser} from "../actions/setCurrentUser";
import setRanks from "../actions/setRanks";

export const getPerson = (id) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.get('/api/v0.0/user', {id}, (response) => {
        dispatch(setCurrentUser(response.user));
        dispatch(setRanks(response.ranks));
    });
};