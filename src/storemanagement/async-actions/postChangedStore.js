import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "./getStoresForEditor";

const postChangedStore = (store) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/store', {...store},dispatch,getState)
        .then(()=> dispatch(setStoresForEditor()));
};

export default postChangedStore;