import {SET_CURRENT_STORE_ID} from "./types";

const setCurrentStoreId = (storeId) => ({
    type: SET_CURRENT_STORE_ID,
    storeId,
});

export default setCurrentStoreId;