import {CURRENT_STORE_UPDATE, SET_STORES_FOR_EDITOR, SET_IS_ALL_FOR_STORES} from "../actions/types";

const defaultStoresState = {
    currentStore: null,
    isAll: false,
};

const storemngmt = (state = defaultStoresState, action) => {
    switch (action.type) {
        case CURRENT_STORE_UPDATE:
            return {
                ...state,
                currentStore:action.store,
            };

        case SET_IS_ALL_FOR_STORES:
            return {
                ...state,
                isAll: action.isAll,
            };

        default:
            return state;
    }
};
export default storemngmt;