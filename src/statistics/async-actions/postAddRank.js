import HTTPS from "../../core/HTTPS";
import getRanks from "./getRanks";
import getStatistics from "./getStatistics";

const postAddRank = (name, payment) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/users/add_rank', {name, payment}, dispatch, getState)
        .then(() => {
            dispatch(getRanks());
            dispatch(getStatistics());
        });
};

export default postAddRank;