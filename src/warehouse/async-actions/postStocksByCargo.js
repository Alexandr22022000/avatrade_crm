import HTTPS from "../../core/HTTPS";

export const postStocksByCargo = (count,cargo) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_stocks',{count,cargo},dispatch,getState)
        .then(response => {});
};