import HTTPS from "../../core/HTTPS";

const postSell = (store,is_card,services) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/sell',{store,is_card,services}, dispatch,getState)
        .then(()=>{})
};

export default postSell;