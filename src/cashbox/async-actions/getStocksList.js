import HTTPS from "../../core/HTTPS";
import setStocksList from "../actions/setStocksList";

const getStocksList = () => (dispatch, getState) => {
    const search = getState().cashbox.stocksSearch;
    console.log(search);
    HTTPS.get('/api/v0.0/services',{search, is_product: true, is_del: null},dispatch,getState)
        .then(response => dispatch(setStocksList(response.services)))
};

export default getStocksList;