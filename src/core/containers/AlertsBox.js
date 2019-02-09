import {connect} from 'react-redux';
import AlertsBox from "../components/AlertsBox";
import {getMigrates} from "../async-actions/getMigrates";

export default connect(
    state => ({
        migrates: state.status.migrates,
    }),
    dispatch => ({
        onLoadMigrates: () => {
            dispatch(getMigrates())
        }
    })
)(AlertsBox);