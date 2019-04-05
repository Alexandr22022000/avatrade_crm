import HTTPS from "../../core/HTTPS";
import {setStocks} from "../actions/setStocks";

export const getStocks = () => (dispatch, getState) => {
    const filter = getState().warehouse.filter;
    HTTPS.get('/api/v0.1/stocks',{store: filter.store, search: filter.search, is_del: filter.is_del}, dispatch, getState)
        .then(response => {
            const stocks = response.stocks;

            stocks.forEach(item => item.stocks.sort((a, b) => {
                if (+a.store_id < +b.store_id)
                    return -1;
                else
                    return a.store_id === b.store_id ? 0 : 1;
            }));

            dispatch(setStocks(stocks))
        });
};