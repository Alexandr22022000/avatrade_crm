import {SET_MANAGER_ID} from "./types";

const setManager = (manager_id) =>({
    type: SET_MANAGER_ID,
    manager_id
});

export default setManager;