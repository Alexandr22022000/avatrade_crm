import {SET_IS_ALL_FOR_STORES} from "./types";

const setIsAll = (isAll) => ({
    type: SET_IS_ALL_FOR_STORES,
    isAll
});

export default setIsAll;