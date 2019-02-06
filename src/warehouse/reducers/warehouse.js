import {CARGOS_UPDATE, STOCKS_UPDATE, STORES_UPDATE} from "../actions/types";

const defaultState = {
    stocks: null,
    cargos: null,
    stores: null,
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