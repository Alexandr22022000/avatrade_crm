import HTTPS from "../../core/HTTPS";

export const postAddStocks = (count,cargo) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_stocks',{count,cargo},dispatch,getState)
        .then(response => {});
};