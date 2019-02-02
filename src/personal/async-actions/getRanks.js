import HTTPS from "../../core/HTTPS";
import setRanks from "../actions/setRanks";

export const getRanks = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/user', {}, dispatch, getState)
        .then((response) => dispatch(setRanks(response.ranks)));
};