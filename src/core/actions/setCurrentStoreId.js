import {SET_CURRENT_STORE_ID} from "../actions/types";

const setCurrentStoreId = (storeId) => ({
    type: SET_CURRENT_STORE_ID,
    storeId,
});

export default setCurrentStoreId;