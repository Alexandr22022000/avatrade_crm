import HTTPS from "../../core/HTTPS";
import {setCargos} from "../actions/setCargos";

export const getCargos = (search) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/cargos',{search},dispatch,getState)
        .then(response => dispatch(setCargos(response)));
};