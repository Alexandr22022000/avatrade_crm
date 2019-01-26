import {SET_STUFF} from "./types";

export const stuffResponse = (stuff) => {
    return {
        type: SET_STUFF,
        stuff
    }
};