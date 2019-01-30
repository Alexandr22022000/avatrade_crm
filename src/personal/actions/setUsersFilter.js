import {SET_USERS_FILTER} from "./types";

const setUsersFilter = (showAll) => ({
    type:SET_USERS_FILTER,
    showAll,
});

export default setUsersFilter;
