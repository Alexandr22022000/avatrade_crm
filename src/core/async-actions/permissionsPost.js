import {HTTPS} from "../HTTPS";
import {GET} from "../actions/types";
import {permissionsSuccess} from "../actions/permissionsSuccess";

const permissionsPost = (token) => (dispatch, getState) => {
    HTTPS('/api/v0.0/permissions',  GET, token, dispatch, (response) => {
        console.log('checked perm');
        dispatch(permissionsSuccess(response.permissions));
    });
};

export default permissionsPost;