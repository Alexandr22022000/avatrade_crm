import HTTPS from "../../core/HTTPS";
import getServices from "./getServices";

const postAddServices = (name,price,is_product,consumables) => (dispatch,getState) =>{
    HTTPS.post('/api/v0.0/add_services', {name,price,is_product,consumables},dispatch,getState)
        .then(()=> dispatch(getServices()))
};

export default postAddServices;