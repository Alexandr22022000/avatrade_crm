import HTTPS from "../../core/HTTPS";

export const postStocksByArticle = (count,name,article) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_stocks',{count,name,article},dispatch,getState)
        .then(response => {});
};