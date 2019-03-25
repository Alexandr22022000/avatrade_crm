import HTTPS from "../../core/HTTPS";

const postCalendar = (id, values) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/statistic/calendar',{id, values}, dispatch, getState)
        .then(() => {})
};

export default postCalendar;
