import {
    CHANGE_SELLING_SERVS,
    SERVICES_SEARCH_CHANGE, SET_CURRENT_STORE_ID,
    SET_FAST_SERVICES,
    SET_SERVICES_LIST,
    SET_STOCKS_LIST,
    STOCKS_SEARCH_CHANGE
} from "../actions/types";

const defaultState = {
    fastServices:[],
    services:[],
    stocks:[],
    servicesSearch: '',
    stocksSearch: '',
    sellServices:[],
    currentStoreId: null,
};

const cashbox = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FAST_SERVICES:
            return {
                ...state,
                fastServices: action.fastServices
            };
        case SET_STOCKS_LIST:
            return {
                ...state,
                stocks: action.stocks,
            };
        case SET_SERVICES_LIST:
            return {
                ...state,
                services: action.services,
            };
        case SERVICES_SEARCH_CHANGE:
            return {
                ...state,
                servicesSearch: action.search,
            };
        case STOCKS_SEARCH_CHANGE:
            return {
                ...state,
                stocksSearch: action.search,
            };
        case CHANGE_SELLING_SERVS:
            return {
                ...state,
                sellServices:action.services,
            };
        case SET_CURRENT_STORE_ID:
            return {
                ...state,
                currentStoreId: action.storeId,
            };
        default:
            return state;
    }
};

export default cashbox;