import {connect} from 'react-redux';
import AlertBoxWrapper from "../components/AlertBoxWrapper";
import getNotifications from '../async-actions/getNotifications';
import setSelectedObject from '../actions/setSelectedObject';

export default connect(
    state=> ({
        notifications: state.alerts.notifications,
        selectedObjectType: state.alerts.selectedObjectType,
    }),
    dispatch=>({
        getNotifications: () => {
            dispatch(getNotifications())
        },
        onCloseWindow: () => {
            dispatch(setSelectedObject(null, null))
        }
    })
)(AlertBoxWrapper);