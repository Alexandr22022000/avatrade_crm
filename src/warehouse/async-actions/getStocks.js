import HTTPS from "../../core/HTTPS";
import {setStocks} from "../actions/setStocks";

export const getStocks = () => (dispatch, getState) => {
    const filter = getState().warehouse.filter;
    HTTPS.get('/api/v0.1/stocks',{is_all: filter.is_all, store: filter.store, search: filter.search}, dispatch, getState)
        .then(response => dispatch(setStocks(response.stocks)));
};