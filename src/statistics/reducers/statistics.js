import {SET_CALENDARS_STATES, SET_DATE, SET_RANKS, SET_STATISTICS} from "../actions/types";

const defaultStatistics = {
    turnover: [],
    workCalendars: [],
    payment: [],
    calendarsState: {
        i: null,
        j: null,
        k: null,
    },
    date: {
        month: 0,
        year: (new Date()).getFullYear(),
    },
    ranks: [],
};

const statistics = (state = defaultStatistics, action) => {
    switch (action.type) {
        case SET_RANKS:
            return {
                ...state,
                ranks: action.ranks,
            };
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
        case SET_DATE:
            return {
                ...state,
                date: action.date,
            };
        default:
            return state;
    }
};

export default statistics;