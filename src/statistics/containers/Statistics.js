import {connect} from 'react-redux';
import Statistics from "../components/Statistics";
import getStatistics from "../async-actions/getStatistics";
import postCalendar from "../async-actions/postCalendar";
import postPayment from "../async-actions/postPayment";

export default connect(
    state => ({
        turnover: state.statistics.turnover,
        workCalendars: state.statistics.workCalendars,
        payment: state.statistics.payment,
    }),
    dispatch => ({
        onLoadStatistics: (date) => dispatch(getStatistics(date)),
        onSetCalendar: (id, values) => dispatch(postCalendar(id, values)),
        onSetPayment: (id, paid) => dispatch(postPayment(id, paid))
    })
)(Statistics)