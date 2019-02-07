import {CARGOS_UPDATE, STOCKS_UPDATE, STORES_UPDATE, CHANGE_FILTER} from "../actions/types";

const defaultState = {
    stocks: null,
    cargos: null,
    stores: null,
    filter: {
        search: '',
        store: null,
        is_all: true,
    }
};

const warehouse = (state = defaultState, action) => {
    switch (action.type) {
        case STORES_UPDATE:
            return {
                ...state,
                stores: action.stores
            };
        case STOCKS_UPDATE:
            return{
                ...state,
                stocks:action.stocks
            };
        case CHANGE_FILTER:
            return{
                ...state,
                filter: {
                    search: action.search,
                    store: action.store,
                    is_all: action.is_all,
                }
            };
        case CARGOS_UPDATE:
            return {
                ...state,
                cargos:action.cargos,
            };
        default:
            return state;
    }
};

export default warehouse;