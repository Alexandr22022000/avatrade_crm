import {
    CHANGE_BLOCK_STATUS,
    CLOSE_PERSON_MODAL,
    OPEN_PERSON_MODAL,
    SET_CURRENT_USER,
    SET_STUFF
} from "../actions/types";
import {FETCHING_USER_DATA} from "../../core/actions/types";

const defaultStuffState = {
    modalIsOpen: false,
    stuff: [],
    currentUser: null,
    blockStatuses: [false,false,false,false]
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
        case CHANGE_BLOCK_STATUS:
            let tempArray = [false, false, false,false];
            if(action.index !== -1)
                tempArray[action.index] = true;
            return {
                ...state,
                blockStatuses: [...tempArray],
            };
        case FETCHING_USER_DATA:
            return{
                ...state,
                currentUser:action.data
            };
        default:
            return state;
    }
};

export default  stuff;