import HTTPS from "../../core/HTTPS";
import setNotifications from "../actions/setNotifications";

const getNotifications = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/notifications',{},dispatch,getState)
        .then(response => dispatch(setNotifications(response.notifications)))
};

export default getNotifications;