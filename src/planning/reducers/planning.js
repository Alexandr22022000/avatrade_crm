import {SET_ORDERS} from "../actions/types";

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
};

const planning = (state = defaultSate, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            };
        default:
            return state;
    }
};

export default planning;