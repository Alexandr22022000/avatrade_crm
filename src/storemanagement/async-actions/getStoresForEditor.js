import HTTPS from "../../core/HTTPS";
import setStoresForEditor from "../actions/setStoresForEditor";

const getStoresForEditor = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/stores',{is_all: getState().storemngmt.isAll}, dispatch, getState)
        .then(response => dispatch(setStoresForEditor(response.stores)));
};

export default getStoresForEditor;