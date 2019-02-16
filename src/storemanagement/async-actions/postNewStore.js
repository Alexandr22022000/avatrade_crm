import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "./getStoresForEditor";

const postNewStore = (store) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_store', {...store}, dispatch,getState)
        .then((respone) => dispatch(setStoresForEditor()));
};

export default postNewStore;