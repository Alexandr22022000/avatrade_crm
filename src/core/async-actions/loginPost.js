import HTTPS from "../HTTPS";
import {loginSuccess} from "../actions/loginSuccess";
import {SERVER_STATUS} from "../HTTPS/serverStatuses";
import {requestError} from "../actions/requestError";
import goodLoginError from "../actions/goodLoginError";


const loginPost = (login, password) => (dispatch, getState) => {
    HTTPS.postRequest('/api/v0.0/login', {login, password})
        .then((response) => {
            dispatch(loginSuccess(response));
        })
        .catch((error) => {
            if (!error) {
                dispatch(goodLoginError("Нет подключения к серверу"));
                return;
            }

            switch (error.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    dispatch(goodLoginError("Не верный логин или пароль"));
                    break;

                case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                    dispatch(goodLoginError("Ошибка на сервере"));
                    break;

                default:
                    HTTPS.catch(error);
                    break;
            }
        });
};

export default loginPost;