import HTTPS from "../../core/HTTPS";
import getStatistics from "./getStatistics";

const postCalendar = (id, values) => (dispatch, getState) => {

    HTTPS.post('/api/v0.0/statistic/calendar',{id, values}, dispatch, getState)
        .then(() => {dispatch(getStatistics())})
};

export default postCalendar;
