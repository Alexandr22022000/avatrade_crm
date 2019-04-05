import HTTPS from "../../core/HTTPS";
import setStatistics from "../actions/setStatistics";

const getStatistics = () => (dispatch, getState) => {
    const state = getState().statistics.date;
    let date = new Date();
    date.setFullYear(state.year, state.month);
    HTTPS.get('/api/v0.0/statistic', {date: date.getTime()}, dispatch, getState)
        .then(response => dispatch(setStatistics(response)))
};

export default getStatistics;