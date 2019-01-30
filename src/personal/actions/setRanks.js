import {SET_RANKS} from "./types";

export default (ranks) => {
    return {
        type: SET_RANKS,
        ranks
    }
};