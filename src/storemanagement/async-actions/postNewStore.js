import HTTPS from "../../core/HTTPS";
import {getStores} from "../../warehouse/async-actions/getStores";

const postNewStore = (store) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_store', {...store}, dispatch,getState)
        .then((respone) => dispatch(getStores()))
        .catch(error => console.log(error));
};

export default postNewStore;