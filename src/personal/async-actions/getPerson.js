import HTTPS from "../../core/HTTPS";
import {setCurrentUser} from "../actions/setCurrentUser";
import setRanks from "../actions/setRanks";

export const getPerson = (id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/user', {id}, dispatch, getState)
        .then((response) => {
            dispatch(setCurrentUser(response.user));
            dispatch(setRanks(response.ranks));
        });
};