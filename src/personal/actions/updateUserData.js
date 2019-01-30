import {UPDATE_USER_DATA} from "./types";

export default (data, name) => {
    return {
        type: UPDATE_USER_DATA,
        data,
        name,
    }
};