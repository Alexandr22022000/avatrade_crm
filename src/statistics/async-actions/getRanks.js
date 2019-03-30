import HTTPS from "../../core/HTTPS";
import setRanks from "../actions/setRanks";

const getRanks = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/users/ranks',{}, dispatch, getState)
        .then(response => dispatch(setRanks(response.ranks)))
};

export default getRanks;