import {SET_CURRENT_SERVICE} from "./types";

const setCurrentService = (service) => ({
    type: SET_CURRENT_SERVICE,
    service,
});

export default setCurrentService;