import {SET_CUR_ORDER} from "./types";

const setCurrentOrder = (order) => ({
    type: SET_CUR_ORDER,
    order,
});

export default setCurrentOrder;