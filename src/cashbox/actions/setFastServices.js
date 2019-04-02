import {SET_FAST_SERVICES} from "./types";


const setFastServices = (fastServices) => ({
    type: SET_FAST_SERVICES,
    fastServices
});

export default setFastServices;