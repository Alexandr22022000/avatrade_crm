import HTTPS from "../../core/HTTPS";
import getOrders from "./getOrders";

const postOrder = (order) => (dispatch, getState) => {
    console.log(order)
    HTTPS.post('/api/v0.0/planning/order', {...order}, dispatch, getState)
        .then(() => dispatch(getOrders()));
};

export default postOrder;