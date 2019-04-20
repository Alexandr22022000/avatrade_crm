import HTTPS from "../../core/HTTPS";
import getOrders from "./getOrders";

const postNewOrder = (order) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/planning/add_order', {...order}, dispatch, getState)
        .then(() => dispatch(getOrders()))
};

export default postNewOrder;