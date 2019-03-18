import {STOCKS_SEARCH_CHANGE} from "./types";

const setStocksSearch = (search) => ({
    type: STOCKS_SEARCH_CHANGE,
    search
});
export default setStocksSearch;