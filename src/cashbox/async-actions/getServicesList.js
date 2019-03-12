import HTTPS from "../../core/HTTPS";
import setServicesList from "../actions/setServicesList";

const getServicesList = () => (dispatch, getState) => {
    const search = getState().cashbox.servicesSearch;
    console.log(search);
    HTTPS.get('/api/v0.0/services',{search, is_product: false, is_del: null}, dispatch, getState)
        .then(response => dispatch(setServicesList(response.services)))
};

export default getServicesList;