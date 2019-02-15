import HTTPS from "../../core/HTTPS";
import {getStores} from "../../warehouse/async-actions/getStores";

const postChangedStore = (store) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/store', {...store},dispatch,getState)
        .then(()=> dispatch(getStores()));
};

export default postChangedStore;