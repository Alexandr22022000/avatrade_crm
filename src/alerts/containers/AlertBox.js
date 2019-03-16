import {connect} from 'react-redux';
import AlertBox from "../components/AlertBox";
import getMigrate from '../async-actions/getMigrate';
import getRequest from '../async-actions/getRequest';
import setSelectedObject from '../actions/setSelectedObject';
import NOTIFICATIONS from '../constants/notificationsTypes';

export default connect(
    state=> ({
        notifications: state.alerts.notifications,
    }),
    dispatch=>({
        getMigrate: migrate => {
            dispatch(getMigrate(migrate));
        },
        getRequest: () => {
            dispatch(getRequest())
        },
        onOpenDetails: () => {
            dispatch(setSelectedObject(null, NOTIFICATIONS.WAITING));
        }
    })
)(AlertBox);