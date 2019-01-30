import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {loginError} from "../actions/loginError";
import {requestError} from "../actions/requestError";
import {SERVER_STATUS} from "./serverStatuses";


const thenCallback = (response, callback) => {
    callback(response.data);
    return response;
};

const catchCallback = (error, dispatch) => {
    if (!error) {
        dispatch(requestError(SERVER_STATUS.NO_CONNECTION, "Нет подключения к серверу!"));
        return alert("Нет подключения к серверу!");
    }

    switch (error.status) {
        case SERVER_STATUS.UNAUTHORIZED:
            dispatch(loginError(error.statusText));
            break;
        case SERVER_STATUS.NOT_FOUND:
            dispatch(requestError(SERVER_STATUS.NOT_FOUND, error.statusText));
            break;
        case SERVER_STATUS.INTERNAL_SERVER_ERROR:
            dispatch(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, error.statusText));
            break;
        default:
            dispatch(requestError(error.status, error.statusText));
            break;
    }
};

const HTTPS = {
    token: null,
    HTTP: null,
    dispatch: null,

    post (url, body, callback){
        let token = this.token;
        this.HTTP.post(url,{...body,token })
            .then((response) => thenCallback(response, callback))
            .catch((reason => catchCallback(reason.response, this.dispatch)));
    },

    get(url, params, callback) {
        let token = this.token;
        this.HTTP.get(url, {params:{...params, token}})
            .then((response)=> thenCallback(response,callback))
            .catch(reason => catchCallback(reason.response, this.dispatch));
    }
};

HTTPS.HTTP = axios.create({
    baseURL: getCleanUrl()
});

export default HTTPS;