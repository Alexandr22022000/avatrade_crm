import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "./getStoresForEditor";
import {SERVER_STATUS} from "../../core/HTTPS/serverStatuses";

const postChangedStore = (store) => (dispatch, getState) => {
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Подразделение с таким названием или адресом уже существует!",
    };

    HTTPS.post('/api/v0.0/store', {...store}, dispatch, getState, errors)
        .then(()=> dispatch(setStoresForEditor()));
};

export default postChangedStore;