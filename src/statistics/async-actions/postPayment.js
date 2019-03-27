import HTTPS from "../../core/HTTPS";
import getStatistics from "./getStatistics";

const postPayment = (id, paid) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/statistic/payment',{id, paid}, dispatch, getState)
        .then(() => {dispatch(getStatistics())})
};

export default postPayment;