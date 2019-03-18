import HTTPS from "../../core/HTTPS";
import {SERVER_STATUS} from "../../core/HTTPS/serverStatuses";
import setSellingServs from '../actions/setSellingServs';

const postSell = (is_card,services) => (dispatch, getState) => {
    const store = getState().status.storeId;
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Недостаточно материалов на складе!",
    };

    HTTPS.post('/api/v0.0/sale',{store,is_card,services}, dispatch,getState, errors)
        .then(()=>{
            alert("Проданно!");
            dispatch(setSellingServs([]));
        })
};

export default postSell;