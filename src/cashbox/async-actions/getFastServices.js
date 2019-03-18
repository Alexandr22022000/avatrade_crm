import HTTPS from "../../core/HTTPS";
import setFastServices from "../actions/setFastServices";

const getFastServices = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/fast_services',{},dispatch,getState)
        .then(response => {dispatch(setFastServices(response.fast_services))});
};

export default getFastServices;