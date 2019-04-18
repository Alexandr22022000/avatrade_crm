import {SET_ORDERS} from "./types";


const setOrders = (orders) => ({
    type: SET_ORDERS,
    orders,
});

export default setOrders;