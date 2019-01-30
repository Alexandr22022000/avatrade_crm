import HTTPS from "../HTTPS";
import {loginSuccess} from "../actions/loginSuccess";
import {SERVER_STATUS} from "../HTTPS/serverStatuses";
import {requestError} from "../actions/requestError";
import goodLoginError from "../actions/goodLoginError";


const loginPost = (login, password) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.HTTP.post('/api/v0.0/login', {login, password})
        .then(response => {
            HTTPS.token = response.data.token;
            dispatch(loginSuccess(response.data));
        })
        .catch((reason) => {
            if (!reason.response) {
                dispatch(goodLoginError("Нет подключения к серверу"));
                return;
            }

            switch (reason.response.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    dispatch(goodLoginError("Не верный логин или пароль"));
                    break;
                case SERVER_STATUS.NOT_FOUND:
                    dispatch(requestError(SERVER_STATUS.NOT_FOUND, reason.response.statusText));
                    break;
                case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                    dispatch(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, reason.response.statusText));
                    break;
                default:
                    dispatch(requestError(reason.response.status, reason.response.statusText));
                    break;
            }
        });
};

export default loginPost;