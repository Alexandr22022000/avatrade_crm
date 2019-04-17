import {SET_SEARCH} from "./types";

const setSearch= (search) => ({
    type: SET_SEARCH,
    search
});

export default setSearch;