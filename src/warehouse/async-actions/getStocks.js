import HTTPS from "../../core/HTTPS";
import {setStocks} from "../actions/setStocks";

export const getStocks = (is_all, store,search) => (dispatch, getState) => {
    console.log({is_all,store,search});
    HTTPS.get('/api/v0.0/stocks',{is_all,store,search},dispatch,getState)
        .then(response => dispatch(setStocks(response.stocks)));
};