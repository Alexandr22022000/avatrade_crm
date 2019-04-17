import {SET_DATE, SET_MANAGER_ID, SET_SEARCH, SET_SELLS, SET_STORE_ID} from "../actions/types";

const defaultState = {
    date: {
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        day: (new Date()).getDate(),
    },
    sells: [],
    manager_id: null,
    store_id: null,
    search: null
};

const sells = (state = defaultState, action) => {
    switch (action.type) {
        case (SET_SELLS):
            return {...state, sells: action.sells};
        case (SET_DATE):
            return {...state, date: action.date};
        case (SET_MANAGER_ID):
            return {...state, manager_id: action.manager_id};
        case (SET_STORE_ID):
            return {...state, store_id: action.store_id};
        case (SET_SEARCH):
            return {...state, search: action.search};
        default:  return state;
    }

}


export default sells;