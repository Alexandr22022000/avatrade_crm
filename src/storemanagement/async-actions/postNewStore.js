import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "./getStoresForEditor";
import {SERVER_STATUS} from "../../core/HTTPS/serverStatuses";

const postNewStore = (store) => (dispatch, getState) => {
    const errors = {
        [SERVER_STATUS.CONFLICT]: "Подразделение с таким названием или адресом уже существует!",
    };

    HTTPS.post('/api/v0.0/add_store', {...store}, dispatch, getState, errors)
        .then((respone) => dispatch(setStoresForEditor()));
};

export default postNewStore;