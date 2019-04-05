import {connect} from 'react-redux';
import Statistics from "../components/Statistics";
import getStatistics from "../async-actions/getStatistics";
import postCalendar from "../async-actions/postCalendar";
import postPayment from "../async-actions/postPayment";
import setCalendarsState from "../actions/setCalendarsState";
import setDate from "../actions/setDate";
import getRanks from "../async-actions/getRanks";
import postRank from "../async-actions/postRank";
import postAddRank from "../async-actions/postAddRank";

export default connect(
    state => ({
        turnover: state.statistics.turnover,
        workCalendars: state.statistics.workCalendars,
        payment: state.statistics.payment,
        calendars: state.statistics.calendarsState,
        date: state.statistics.date,
        ranks: state.statistics.ranks,
    }),
    dispatch => ({
        onLoadStatistics: () => dispatch(getStatistics()),
        onSetCalendar: (id, values) => dispatch(postCalendar(id, values)),
        onSetPayment: (id, paid) => dispatch(postPayment(id, paid)),
        onSetCalendarsState: (calendarsState) => dispatch(setCalendarsState(calendarsState)),
        onSetDate: (date) => dispatch(setDate(date)),
        onLoadRanks: () => dispatch(getRanks()),
        onSetRank: (id, name, payment) => dispatch(postRank(id, name, payment)),
        onAddRank: (name, payment) => dispatch(postAddRank(name, payment)),
    })
)(Statistics)