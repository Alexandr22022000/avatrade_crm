import HTTPS from "../../core/HTTPS";
import {setStores} from "../../warehouse/actions/setStores";

const getStoresForEditor = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/stores',{is_all: getState().storemngmt.isAll}, dispatch, getState)
        .then(response => dispatch(setStores(response.stores.sort((firstValue, secondValue)=>{
            return firstValue.id - secondValue.id;
        }))));
};

export default getStoresForEditor;