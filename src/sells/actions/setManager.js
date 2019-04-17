import {SET_MANAGER_ID} from "./types";

const setManager = (manager_id) =>({
    typ: SET_MANAGER_ID,
    manager_id
});

export default setManager;