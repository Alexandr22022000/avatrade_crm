import HTTPS from "../../core/HTTPS";

const postFastServices = (fast_services) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/fast_services',{fast_services},dispatch,getState)
        .then(()=>{});
};

export default postFastServices;