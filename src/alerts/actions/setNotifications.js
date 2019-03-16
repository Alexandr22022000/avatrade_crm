import {SET_NOTIFICATIONS} from './types';

const setNotifications = (notifications) => ({
    type: SET_NOTIFICATIONS,
    notifications,
});

export default setNotifications;