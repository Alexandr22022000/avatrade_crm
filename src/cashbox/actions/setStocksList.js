import {SET_STOCKS_LIST} from "./types";

const setStocksList = (stocks) => ({
    type: SET_STOCKS_LIST,
    stocks,
});
export default setStocksList;