import {SET_CURRENT_USER} from "./types";

const delCurrentUser = () => {
    return{
        type: SET_CURRENT_USER,
    }
};

export default delCurrentUser;