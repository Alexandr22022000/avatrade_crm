import {SET_CONSUMABLES} from "./types";

const setConsumables = (consumables) => ({
    type: SET_CONSUMABLES,
    consumables,
});
export default setConsumables;