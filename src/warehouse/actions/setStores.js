import {STORES_UPDATE} from "./types";

export const setStores = (stores) => ({
    type: STORES_UPDATE,
    stores
});
