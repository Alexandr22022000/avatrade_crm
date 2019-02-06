import HTTPS from "../../core/HTTPS";

export const postAddNewStocks = (name,article,count) => (dispatch, getState) =>{
    HTTPS.post('/api/v0.0/add_stocks',{name,article,count},dispatch,getState)
        .then(response => {});
};
