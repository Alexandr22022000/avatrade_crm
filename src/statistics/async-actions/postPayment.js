import HTTPS from "../../core/HTTPS";

const postPayment = (id, paid) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/statistic/payment',{id, paid}, dispatch, getState)
        .then(() => {})
};

export default postPayment;