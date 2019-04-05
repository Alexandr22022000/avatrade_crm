import {
    CARGOS_UPDATE,
    STOCKS_UPDATE,
    STORES_UPDATE,
    CHANGE_FILTER,
    CHECK_STOCK,
    CHECK_ALL_STOCK,
    SET_CURRENT_CARGO
} from "../actions/types";

const defaultState = {
    stocks: [],
    cargos: [],
    stores: [],
    buffer: [],
    filter: {
        search: '',
        store: null,
        is_del: false,
    },
    currentCargo: null,
};

const warehouse = (state = defaultState, action) => {
    switch (action.type) {
        case STORES_UPDATE:

            return {
                ...state,
                stores: action.stores
            };

        case STOCKS_UPDATE:
            let newBuffer = state.buffer.filter(item => item.isChecked);
            newBuffer = [...newBuffer, ...state.stocks.filter(item => item.isChecked)];

            let newStocks = action.stocks.map(item => {
                item.isChecked = false;
                return item;
            });

            newBuffer = newBuffer.filter(bufferItem => {
                let isOk = true;
                newStocks = newStocks.map(stocksItem => {
                    if (bufferItem.id === stocksItem.id) {
                        isOk = false;
                        stocksItem.isChecked = true;
                    }

                    return stocksItem;
                });

                return isOk;
            });

            return {
                ...state,
                buffer: newBuffer,
                stocks: newStocks,
            };

        case CHECK_STOCK:
            if (action.isBuffer) {
                const buffer = [...state.buffer];
                buffer[action.index].isChecked = !buffer[action.index].isChecked;

                return {
                    ...state,
                    buffer,
                };
            }
            else {
                const stocks = [...state.stocks];
                stocks[action.index].isChecked = !stocks[action.index].isChecked;

                return {
                    ...state,
                    stocks,
                };
            }

        case CHECK_ALL_STOCK:
            const stocks = state.stocks.map(item => {item.isChecked = action.check; return item;}),
                buffer = state.buffer.map(item => {item.isChecked = action.check; return item;});

            return {
                ...state,
                stocks,
                buffer,
            };

        case CHANGE_FILTER:
            return{
                ...state,
                filter: {
                    search: action.search,
                    store: action.store,
                    is_del: action.is_del,
                }
            };

        case CARGOS_UPDATE:
            return {
                ...state,
                cargos: action.cargos,
            };
        case SET_CURRENT_CARGO:
            return {
                ...state,
                currentCargo: action.cargo,
            };
        default:
            return state;
    }
};

export default warehouse;