import HTTPS from "../../core/HTTPS";
import {SERVER_STATUS} from "../../core/HTTPS/serverStatuses";
import getNotifications from './getNotifications';
import {getStocks} from '../../warehouse/async-actions/getStocks';

export const approveMigrate = (id) => (dispatch, getState) => {
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Недостаточно грузов на складе отправителе!",
    };

    HTTPS.post('/api/v0.0/approve_migrate',{id}, dispatch, getState, errors)
        .then((response) => {
            dispatch(getNotifications());
            dispatch(getStocks());
        });
};