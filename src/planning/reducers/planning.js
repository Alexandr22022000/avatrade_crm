import {CHANGE_ORDER_FILTER, SET_CUR_ORDER, SET_ORDERS} from "../actions/types";

const defaultSate = {
    orders: [],
    filter: {
        start: null,
        end: null,
        manager_id: null,
        store_id: null,
        status: null,
        type: null,
        search: '',
    },
    currentOrder: null,
};

const planning = (state = defaultSate, action) => {
    switch (action.type) {
        case CHANGE_ORDER_FILTER:
            return {
                ...state,
                filter: action.filter,
            };
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            };
        case SET_CUR_ORDER:
            return {
                ...state,
                currentOrder: action.order,
            };
        default:
            return state;
    }
};

export default planning;