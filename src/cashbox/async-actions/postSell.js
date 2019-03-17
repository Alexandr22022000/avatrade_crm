import HTTPS from "../../core/HTTPS";

const postSell = (is_card,services) => (dispatch, getState) => {
    const store = getState().cashbox.currentStoreId;
    HTTPS.post('/api/v0.0/sale',{store,is_card,services}, dispatch,getState)
        .then(()=>{})
};

export default postSell;