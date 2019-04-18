import HTTPS from "../../core/HTTPS";
import setOrders from "../actions/setOrders";

const getOrders = () => (dispatch, getState) => {
    let {start, end, manager_id, store_id, status, type, search} = getState().planning.filter;
    HTTPS.get('/api/v0.0/planning/orders', {start, end, manager_id, store_id, status, type, search}, dispatch, getState)
        .then((response) => dispatch(setOrders(response)));
};

export default getOrders;