import {FETCHING_USER_DATA} from "./types";

export const fetchUserData = (data) => {
    return {
        type: FETCHING_USER_DATA,
        data
    }
};