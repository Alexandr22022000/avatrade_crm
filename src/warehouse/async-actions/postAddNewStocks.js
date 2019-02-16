import HTTPS from "../../core/HTTPS";
import {getStocks} from './getStocks';
import {SERVER_STATUS} from '../../core/HTTPS/serverStatuses'

export const postAddNewStocks = (name,article,count) => (dispatch, getState) =>{
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Груз с таким именем или артикулом уже существует!",
    };

    HTTPS.post('/api/v0.0/add_stocks',{name,article,count}, dispatch, getState, errors)
        .then(response => dispatch(getStocks()));
};
