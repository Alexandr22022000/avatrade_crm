import HTTPS from "../../core/HTTPS";
import setRanks from "../actions/setRanks";

export const getRanks = () => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.get('/api/v0.0/user', {}, (response) => {
        dispatch(setRanks(response.ranks));
    });
};