import HTTPS from "../../core/HTTPS";
import setSelectedObject from "../actions/setSelectedObject";
import NOTIFICATIONS from "../constants/notificationsTypes";

const getMigrate = (id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/migrate',{id},dispatch,getState)
        .then(response => dispatch(setSelectedObject(response, NOTIFICATIONS.MIGRATION)))
};

export default getMigrate;