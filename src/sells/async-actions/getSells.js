import set_sells from "../actions/setSells";
import HTTPS from "../../core/HTTPS";

const getSells = () => (dispatch, getState) => {
    let {date, manager_id, store_id, search} = getState().sells;
    let start, end;
    start = new Date(date.year || 2000,date.month || 1, date.day|| 1);
    if (date.day!==null)
        end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
    else
        end = new Date(start.getFullYear(), start.getMonth()+1 , 1);
    start = start.getTime();
    end = end.getTime();
    HTTPS.get('/api/v0.0/cashbox/sells', {start, end, manager_id, store_id, search}, dispatch, getState)
        .then(res => (dispatch(set_sells(res))));
};


export default getSells;