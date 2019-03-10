import HTTPS from "../../core/HTTPS";
import getServices from "./getServices";

const postService = (id,name,price,is_product,consumables) => (dispatch,getState) => {
    HTTPS.post('/api/v0.0/services',{id,name,price,is_product,consumables},dispatch,getState)
        .then(()=> dispatch(getServices()))
};

export default postService;