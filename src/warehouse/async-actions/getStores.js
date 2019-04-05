import HTTPS from "../../core/HTTPS";
import {setStores} from "../actions/setStores";

export const getStores = () => (dispatch, getState)=>{
    HTTPS.get('/api/v0.0/stores',{},dispatch,getState)
        .then(response => dispatch(setStores(response.stores.sort((firstValue, secondValue)=>{
            return firstValue.id - secondValue.id;
        }))));
};