import HTTPS from "../../core/HTTPS";
import setSelectedObject from "../actions/setSelectedObject";
import NOTIFICATIONS from "../constants/notificationsTypes";

const getRequest = (id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/migrate_request',{id},dispatch,getState)
        .then(response => dispatch(setSelectedObject(response, NOTIFICATIONS.MIGRATION_REQUESTS)))
};

export default getRequest;