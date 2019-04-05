import {CHANGE_FILTER_SERV} from "./types";

const changeFilter = (search,is_product,is_del) => ({
    type: CHANGE_FILTER_SERV,
    filter: {
        search,
        is_product,
        is_del
    }
});

export default changeFilter;