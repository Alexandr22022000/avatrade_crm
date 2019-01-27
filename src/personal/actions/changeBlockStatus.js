import {CHANGE_BLOCK_STATUS} from "./types";

export const changeBlockStatus = (index) => {
    return {
        type: CHANGE_BLOCK_STATUS,
        index
    }
};