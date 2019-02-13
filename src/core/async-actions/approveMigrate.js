import HTTPS from "../HTTPS";
import {getMigrates} from './getMigrates';
import {getStocks} from '../../warehouse/async-actions/getStocks';

export const approveMigrate = (id) => (dispatch, getState) =>{
    HTTPS.post('/api/v0.0/approve_migrate',{id}, dispatch, getState)
        .then((response) => {
            dispatch(getMigrates());
            dispatch(getStocks());
        });
};