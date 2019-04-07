import {SET_CAN_SELL} from "./types";


const setFastServices = (canSell) => ({
    type: SET_CAN_SELL,
    canSell,
});

export default setFastServices;