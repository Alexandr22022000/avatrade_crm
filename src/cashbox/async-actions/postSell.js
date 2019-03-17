import HTTPS from "../../core/HTTPS";
import {SERVER_STATUS} from "../../core/HTTPS/serverStatuses";

const postSell = (is_card,services) => (dispatch, getState) => {
    const store = getState().cashbox.currentStoreId;
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Недостаточно материалов на складе!",
    };

    HTTPS.post('/api/v0.0/sale',{store,is_card,services}, dispatch,getState, errors)
        .then(()=>{})
};

export default postSell;