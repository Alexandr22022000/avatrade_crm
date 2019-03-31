import HTTPS from "../../core/HTTPS";
import {getStocks} from "./getStocks";

const postSetCargo = (id, name, article) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/set_cargo', {id, name, article}, dispatch, getState)
        .then(() => dispatch(getStocks()))
};

export default postSetCargo;