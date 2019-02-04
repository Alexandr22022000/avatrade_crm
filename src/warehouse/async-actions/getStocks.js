import HTTPS from "../../core/HTTPS";
import {setStocks} from "../actions/setStocks";

export const getStocks = (store,search) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/stocks',{is_all:getState().warehouse.showAllStocks,store,search},dispatch,getState)
        .then(response => dispatch(setStocks(response)));
};