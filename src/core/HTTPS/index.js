import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {requestError} from "../actions/requestError";
import {SERVER_STATUS} from "./serverStatuses";

const HTTPS = {
    HTTP: null,
    dispatch: null,

    catch (error) {
        if (!error) {
            this.dispatch(requestError(SERVER_STATUS.NO_CONNECTION, "Нет подключения к серверу!"));
            return;
        }

        switch (error.status) {
            case SERVER_STATUS.UNAUTHORIZED:
                document.location.href = getCleanUrl() + "/login";
                break;
            case SERVER_STATUS.NOT_FOUND:
                this.dispatch(requestError(SERVER_STATUS.NOT_FOUND, "Нет данных!"));
                break;
            case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                this.dispatch(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, "Ошибка на сервере!"));
                break;
            default:
                this.dispatch(requestError(error.status, "Неизвестная ошибка!"));
                break;
        }
    },

    postRequest (url, body) {
        new Promise((resolve, reject) => {
            this.HTTP.post(url, body)
                .then((response) => resolve(response.data))
                .catch((reason => reject(reason.response)));
        });
    },

    getRequest (url, params) {
        new Promise((resolve, reject) => {
            this.HTTP.get(url, {params})
                .then((response) => resolve(response.data))
                .catch((reason => reject(reason.response)));
        });
    },

    post (url, body, dispatch, getState){
        this.dispatch = dispatch;
        new Promise((resolve, reject) => {
            this.postRequest(url, {...body, token: getState().status.token}, dispatch)
                .then((data) => resolve(data))
                .catch(this.catch);
        });
    },

    get(url, params, dispatch, getState) {
        this.dispatch = dispatch;
        new Promise((resolve, reject) => {
            this.getRequest(url, {...params, token: getState().status.token}, dispatch, getState)
                .then((data) => resolve(data))
                .catch(this.catch);
        });
    }
};

HTTPS.HTTP = axios.create({
    baseURL: getCleanUrl()
});

export default HTTPS;