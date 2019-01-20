import HTTPS from "../HTTPS";
import {GET} from "../actions/types";
import {permissionsSuccess} from "../actions/permissionsSuccess";

const permissionsGet = (token) => (dispatch, getState) => {
    HTTPS.setDispatch(dispatch);
    HTTPS.get('/api/v0.0/permissions', {token}, (response) => {
        dispatch(permissionsSuccess(response));
    });
};

export default permissionsGet;