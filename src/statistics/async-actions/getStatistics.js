import HTTPS from "../../core/HTTPS";
import setStatistics from "../actions/setStatistics";

const getStatistics = (date) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/statistic', {date}, dispatch, getState)
        .then(response => dispatch(setStatistics(response)))
};

export default getStatistics;