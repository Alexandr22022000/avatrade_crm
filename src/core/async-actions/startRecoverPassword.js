import HTTPS from "../HTTPS";
import {SERVER_STATUS} from "../HTTPS/serverStatuses";
import goodLoginError from "../actions/goodLoginError";
import {loginSuccess} from "../actions/loginSuccess";


const startRecoverPassword = (email) => (dispatch, getState) => {

    HTTPS.postRequest('/api/v0.0/start_recover_password', {email})
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
                    dispatch(goodLoginError("Не верный email"));
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

export default startRecoverPassword;