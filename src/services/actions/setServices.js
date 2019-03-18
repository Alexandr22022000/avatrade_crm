import {SET_SERVICES} from "./types";

const setServices = (services) => ({
    type: SET_SERVICES,
    services
});

export default setServices;