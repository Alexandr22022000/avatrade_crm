import HTTPS from "../HTTPS";
import {SERVER_STATUS} from "../HTTPS/serverStatuses";
import {requestError} from "../actions/requestError";
import goodLoginError from "../actions/goodLoginError";
import requestSuccess from "../actions/requestSuccess";


const startRecoverPassword = (token, password) => (dispatch, getState) => {
    HTTPS.dispatch = dispatch;
    HTTPS.HTTP.post('/api/v0.0/recover_password', {password, token})
        .then(response => {
            dispatch(requestSuccess());
        })
        .catch((reason) => {
            switch (reason.response.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    dispatch(goodLoginError("Ваша ссылка устарела"));
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

export default startRecoverPassword;