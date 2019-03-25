import HTTPS from "../../core/HTTPS";
import getServices from "./getServices";

const postAddServices = (name,price,is_product, is_resell, consumables) => (dispatch,getState) =>{
    HTTPS.post('/api/v0.1/add_services', {name,price,is_product, is_resell, consumables},dispatch,getState)
        .then(()=> dispatch(getServices()))
};

export default postAddServices;