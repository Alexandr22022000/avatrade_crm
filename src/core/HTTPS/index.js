import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {GET, POST} from "../actions/types";
import {loginError} from "../actions/loginError";
import {requestError} from "../actions/requestError";

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
                case 401:
                    dispatch(loginError(error.response.statusText));
                    break;
                case 404:
                    dispatch(requestError(404, error.response.statusText));
                    break;
                case 500:
                    dispatch(requestError(500, error.response.statusText));
                    break;
                default:
                    dispatch(requestError(error.response.status, error.response.statusText));
                    break;
            }
        }
        catch (e) {
            console.log(error.response);
            dispatch(requestError(0, 'Connection Error'));
        }
    });
};