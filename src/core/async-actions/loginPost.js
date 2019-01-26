import HTTPS from "../HTTPS";
import {loginSuccess} from "../actions/loginSuccess";


const loginPost = (login, password) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.post('/api/v0.0/login', {login, password}, (response) => {
        HTTPS.token = response.token;
        dispatch(loginSuccess(response));
    });
};

export default loginPost;