import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "./getStoresForEditor";

const setStoreStatus = (status, id) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/store_status', {status, id}, dispatch, getState)
        .then(()=> dispatch(setStoresForEditor()));
};

export default setStoreStatus;