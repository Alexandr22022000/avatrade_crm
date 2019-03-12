import {SET_SERVICES_LIST} from "./types";

const setServicesList = (services) => ({
    type: SET_SERVICES_LIST,
    services
});
export default setServicesList;