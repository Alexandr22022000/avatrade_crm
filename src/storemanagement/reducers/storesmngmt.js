import {CURRENT_STORE_UPDATE, STORE_LIST_UPDATE} from "../actions/types";

const defaultStoresState = {
    currentStore: null,
};

const storemngmt = (state = defaultStoresState, action) => {
    switch (action.type) {
        case CURRENT_STORE_UPDATE:
            return {
                ...state,
                currentStore:action.store,
            };
        default:
            return state;
    }
};
export default storemngmt;