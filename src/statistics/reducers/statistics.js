import {SET_STATISTICS} from "../actions/types";

const defaultStatistics = {
    turnover: [],
    workCalendars: [],
    payment: [],
};

const statistics = (state = defaultStatistics, action) => {
    switch (action.type) {
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