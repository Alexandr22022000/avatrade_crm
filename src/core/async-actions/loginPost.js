import {HTTPS} from "../HTTPS";
import {POST} from "../actions/types";
import {loginSuccess} from "../actions/loginSuccess";


const loginPost = (login, password) => (dispatch, getState) => {
    HTTPS('/api/v0.0/login', POST, {login, password}, dispatch, (response) => {
        dispatch(loginSuccess(response));
    });
};

export default loginPost;