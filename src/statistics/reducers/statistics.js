import {SET_CALENDARS_STATES, SET_STATISTICS} from "../actions/types";

const defaultStatistics = {
    turnover: [],
    workCalendars: [],
    payment: [],
    calendarsState: null,
};

const statistics = (state = defaultStatistics, action) => {
    switch (action.type) {
        case SET_CALENDARS_STATES:
            return {
                ...state,
                calendarsState: action.calendarsState,
            };
        case SET_STATISTICS:
            return {
                ...state,
                turnover: action.statistics.turnover,
                workCalendars: action.statistics.workCalendars,
                payment: action.statistics.payment,
            };
        default:
            return state;
    }
};

export default statistics;