import {CURRENT_STORE_UPDATE} from "./types";

const setCurrentStore = (store) => ({
    type: CURRENT_STORE_UPDATE,
    store,
});

export default setCurrentStore;