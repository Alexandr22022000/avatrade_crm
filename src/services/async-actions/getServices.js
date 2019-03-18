import HTTPS from "../../core/HTTPS";
import setServices from "../actions/setServices";

const getServices = () => (dispatch, getState) => {
    const filter = getState().services.filter;
    HTTPS.get('/api/v0.0/services',
        {search: filter.search, is_product: filter.is_product,is_del: filter.is_del},
        dispatch,
        getState
    ).then(response => dispatch(setServices(response.services)));
};

export default getServices;