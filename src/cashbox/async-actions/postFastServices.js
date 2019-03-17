import HTTPS from "../../core/HTTPS";
import getFastServices from "./getFastServices";

const postFastServices = (fast_services) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/fast_services',{fast_services},dispatch,getState)
        .then(()=>{dispatch(getFastServices())});
};

export default postFastServices;