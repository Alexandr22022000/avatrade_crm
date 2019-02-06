import {STOCKS_UPDATE} from "./types";

export const setStocks = (stocks) => ({
    type: STOCKS_UPDATE,
    stocks,
});