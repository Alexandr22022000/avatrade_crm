import {
    SET_SELECTED_OBJECT,
    SET_NOTIFICATIONS,
} from "../actions/types";

const defaultStatus = {
    notifications: [],
    selectedObject: null,
    selectedObjectType: null,
};

const alerts = (state = defaultStatus, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,
            };

        case SET_SELECTED_OBJECT:
            return {
                ...state,
                selectedObject: action.object,
                selectedObjectType: action.object_type,
            };

        default:
            return state;
    }
};

export default alerts;
