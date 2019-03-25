import {SET_STATISTICS} from "./types";

const setStatistics = (statistics) => ({
    type: SET_STATISTICS,
    statistics,
});

export default setStatistics;