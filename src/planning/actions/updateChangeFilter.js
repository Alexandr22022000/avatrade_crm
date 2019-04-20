import {CHANGE_ORDER_FILTER} from "./types";

const updateChangeFilter = (filter) => ({
    type: CHANGE_ORDER_FILTER,
    filter,
});

export default updateChangeFilter;