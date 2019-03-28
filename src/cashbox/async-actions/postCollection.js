import HTTPS from "../../core/HTTPS";

const postCollection = (store_id, value) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/collection',{store_id, value}, dispatch, getState)
        .then(() => {});
};

export default postCollection;