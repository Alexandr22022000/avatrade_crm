import HTTPS from "../HTTPS";
import {getMigrates} from './getMigrates';
import {getStocks} from '../../warehouse/async-actions/getStocks';
import {SERVER_STATUS} from "../HTTPS/serverStatuses";

export const approveMigrate = (id) => (dispatch, getState) => {
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Недостаточно грузов на складе отправителе!",
    };

    HTTPS.post('/api/v0.0/approve_migrate',{id}, dispatch, getState, errors)
        .then((response) => {
            dispatch(getMigrates());
            dispatch(getStocks());
        });
};