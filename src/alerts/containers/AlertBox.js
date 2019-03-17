import {connect} from 'react-redux';
import AlertBox from "../components/AlertBox";
import getMigrate from '../async-actions/getMigrate';
import getRequest from '../async-actions/getRequest';
import setSelectedObject from '../actions/setSelectedObject';

export default connect(
    state=> ({
        notifications: state.alerts.notifications,
    }),
    dispatch=>({
        getMigrate: id => {
            dispatch(getMigrate(id));
        },
        getRequest: (id) => {
            dispatch(getRequest(id))
        },
        onOpenDetails: (type) => {
            dispatch(setSelectedObject(null, type));
        }
    })
)(AlertBox);