import {SERVICES_SEARCH_CHANGE} from "./types";

const setServicesSearch = (search) => ({
    type: SERVICES_SEARCH_CHANGE,
    search
});
export default setServicesSearch;