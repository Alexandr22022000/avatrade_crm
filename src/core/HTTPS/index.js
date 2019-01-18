import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {GET, POST} from "../actions/types";
import {loginError} from "../actions/loginError";
import {requestError} from "../actions/requestError";
import {SERVER_STATUS} from "../constants";

const HTTP = axios.create({
    baseURL: getCleanUrl()
});

export const HTTPS = (url, method, data, dispatch, callback) => {
    let requestHandler;
    switch (method) {
        case POST:
            requestHandler = HTTP.post(url, data);
            break;
        case GET:
            requestHandler = HTTP.get(url, data);
            break;
        default:
            break;
    }
    requestHandler.then((response) => {
        callback(response.data);
    });
    requestHandler.catch((error) => {
        try {
            switch (error.response.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    dispatch(loginError(error.response.statusText));
                    break;
                case SERVER_STATUS.NOT_FOUND:
                    dispatch(requestError(SERVER_STATUS.NOT_FOUND, error.response.statusText));
                    break;
                case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                    dispatch(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, error.response.statusText));
                    break;
                default:
                    dispatch(requestError(error.response.status, error.response.statusText));
                    break;
            }
        }
        catch (e) {
            console.log(error.response);
            dispatch(requestError(SERVER_STATUS.NO_CONNECTION, 'Connection Error'));
        }
    });
};