import {SET_CALENDARS_STATES} from "./types";

const setCalendarsState = (calendarsState) => ({
    type: SET_CALENDARS_STATES,
    calendarsState
});

export default setCalendarsState;