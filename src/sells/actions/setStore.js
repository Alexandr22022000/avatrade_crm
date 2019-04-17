import {SET_STORE_ID} from "./types";

const setStore = (store_id) => ({
    type: SET_STORE_ID,
    store_id
});

export default setStore;