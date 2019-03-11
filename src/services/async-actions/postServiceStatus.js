import HTTPS from "../../core/HTTPS";
import getServices from "./getServices";

const postServiceStatus = (id, status) => (dispatch,getState) => {
    HTTPS.post('/api/v0.0/services_status',{id,status},dispatch,getState)
        .then(()=> dispatch(getServices()))
};

export default postServiceStatus;