import {SET_USERS} from "./types";

export const setUsers = (stuff) => {
    return {
        type: SET_USERS,
        stuff
    }
};