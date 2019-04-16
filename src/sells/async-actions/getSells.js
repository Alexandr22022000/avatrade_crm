import set_sells from "../actions/setSells";
import HTTPS from "../../core/HTTPS";

const getSells = () => (dispatch, getState) => {
    let {start, end, manager_id, store_id, search} = getState().sells;
    HTTPS.get('/api/v0.0/cashbox/sells', {start, end, manager_id, store_id, search}, dispatch, getState)
        .then(res => dispatch(set_sells(res.body)));
};

export default getSells;