import {CLOSE_PERSON_MODAL, OPEN_PERSON_MODAL, SET_CURRENT_USER, SET_STUFF} from "../actions/types";

const defaultStuffState = {
    modalIsOpen: false,
    stuff: [],
    currentUser: null
};

const stuff = (state = defaultStuffState, action) => {
    switch (action.type) {
        case CLOSE_PERSON_MODAL:
            return{
                ...state,
                modalIsOpen: false
            };
        case OPEN_PERSON_MODAL:
            return {
                ...state,
                modalIsOpen: true
            };
        case SET_STUFF:
            return {
                ...state,
                stuff: action.stuff.users
            };
        case SET_CURRENT_USER:
            console.log('SET_CURRENT_USER');
            return {
                ...state,
                currentUser: action.person
            };
        default:
            return state;
    }
};

export default  stuff;