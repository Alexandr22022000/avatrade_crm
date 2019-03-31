import HTTPS from "../../core/HTTPS";
import {getStocks} from "./getStocks";

const postCargoStatus = (id, status) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/cargo/status', {id, status}, dispatch, getState)
        .then(() => dispatch(getStocks()))
};

export default postCargoStatus;