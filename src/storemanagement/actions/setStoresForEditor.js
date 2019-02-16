import {SET_STORES_FOR_EDITOR} from "./types";

const setStoresForEditor = (stores) => ({
    type: SET_STORES_FOR_EDITOR,
    stores
});

export default setStoresForEditor;