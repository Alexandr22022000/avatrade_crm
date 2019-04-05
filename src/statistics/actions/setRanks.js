import {SET_RANKS} from "./types";

const setRanks = (ranks) => ({
    type: SET_RANKS,
    ranks,
});

export default setRanks;