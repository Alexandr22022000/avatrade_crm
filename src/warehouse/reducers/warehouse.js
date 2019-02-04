import {CARGOS_UPDATE, STOCKS_UPDATE} from "../actions/types";

const defaultState = {
    stocks: null,
    showAllStocks: true,
    cargos: null,
};

const warehouse = (state = defaultState, action) => {
    switch (action.type) {
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