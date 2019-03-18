import {CHANGE_FILTER} from "./types";

const changeFilter = (search,is_product,is_del) => ({
    type: CHANGE_FILTER,
    filter: {
        search,
        is_product,
        is_del
    }
});

export default changeFilter;