import HTTPS from "../HTTPS";
import {SERVER_STATUS} from "../HTTPS/serverStatuses";
import goodLoginError from "../actions/goodLoginError";
import requestSuccess from "../actions/requestSuccess";


const startRecoverPassword = (token, password) => (dispatch, getState) => {
    HTTPS.postRequest('/api/v0.0/recover_password', {password, token})
        .then(() => {
            dispatch(requestSuccess());
        })
        .catch((error) => {
            if (!error) {
                dispatch(goodLoginError("Нет подключения к серверу"));
                return;
            }

            switch (error.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    dispatch(goodLoginError("Ваша ссылка устарела"));
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