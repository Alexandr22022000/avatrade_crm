import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {requestError} from "../actions/requestError";
import {SERVER_STATUS} from "./serverStatuses";

const HTTPS = {
    HTTP: null,
    dispatch: null,
    errors: null,

    catch (error, customErrors) {
        let msg;

        if (!error) {
            msg = "Нет подключения к серверу!";
            if (customErrors && customErrors[SERVER_STATUS.NO_CONNECTION]) msg = customErrors[SERVER_STATUS.NO_CONNECTION];
            this.dispatch(requestError(SERVER_STATUS.NO_CONNECTION, msg));
            return;
        }

        switch (error.status) {
            case SERVER_STATUS.UNAUTHORIZED:
                document.location.href = getCleanUrl() + "/login";
                break;
            case SERVER_STATUS.NOT_FOUND:
                msg = "Нет данных!";
                if (customErrors && customErrors[SERVER_STATUS.NOT_FOUND]) msg = customErrors[SERVER_STATUS.NOT_FOUND];
                this.dispatch(requestError(SERVER_STATUS.NOT_FOUND, msg));
                break;
            case SERVER_STATUS.FORBIDDEN:
                msg = "У вас нет полномочий для этого действия!";
                if (customErrors && customErrors[SERVER_STATUS.FORBIDDEN]) msg = customErrors[SERVER_STATUS.FORBIDDEN];
                this.dispatch(requestError(SERVER_STATUS.FORBIDDEN, msg));
                break;
            case SERVER_STATUS.CONFLICT:
                msg = "Действие выполнить невозможно!";
                if (customErrors && customErrors[SERVER_STATUS.CONFLICT]) msg = customErrors[SERVER_STATUS.CONFLICT];
                this.dispatch(requestError(SERVER_STATUS.CONFLICT, msg));
                break;
            case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                msg = "Ошибка на сервере!";
                if (customErrors && customErrors[SERVER_STATUS.INTERNAL_SERVER_ERROR]) msg = customErrors[SERVER_STATUS.INTERNAL_SERVER_ERROR];
                this.dispatch(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, msg));
                break;
            default:
                msg = "Неизвестная ошибка!";
                if (customErrors && customErrors[SERVER_STATUS.DEFAULT]) msg = customErrors[SERVER_STATUS.DEFAULT];
                this.dispatch(requestError(error.status, msg));
                break;
        }
    },

    postRequest (url, body) {
        return new Promise((resolve, reject) => {
            this.HTTP.post(url, body)
                .then((response) => resolve(response.data))
                .catch((reason => reject(reason.response)));
        });
    },

    getRequest (url, params) {
        return new Promise((resolve, reject) => {
            this.HTTP.get(url, {params})
                .then((response) => resolve(response.data))
                .catch((reason => reject(reason.response)));
        });
    },

    post (url, body, dispatch, getState, errors){
        this.dispatch = dispatch;
        return new Promise((resolve, reject) => {
            this.postRequest(url, {...body, token: getState().status.token}, dispatch)
                .then((data) => resolve(data))
                .catch((e) => {this.catch(e, errors); reject(e);});
        });
    },

    get(url, params, dispatch, getState, errors) {
        this.dispatch = dispatch;
        return new Promise((resolve, reject) => {
            this.getRequest(url, {...params, token: getState().status.token}, dispatch, getState)
                .then((data) => resolve(data))
                .catch((e) => {this.catch(e, errors); reject(e);});
        });
    }
};

HTTPS.HTTP = axios.create({
    baseURL: getCleanUrl()
});

export default HTTPS;