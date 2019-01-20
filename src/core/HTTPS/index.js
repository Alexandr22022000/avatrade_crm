import axios from 'axios';
import getCleanUrl from "./getCleanUrl";
import {GET, /*POST*/} from "../actions/types";
import {loginError} from "../actions/loginError";
import {requestError} from "../actions/requestError";
import {SERVER_STATUS} from "../constants";

/*const HTTP = axios.create({
    baseURL: getCleanUrl()
});*/

/*let _callback;

const HTTPS = new class {
    constructor() {
        this.HTTP = axios.create({
            baseURL: getCleanUrl()
        });
        this.HTTP.then((response) => {
            _callback(response.data);
            return response;
        });
        this.HTTP.catch((error) => {
            switch (error.response.status) {
                case SERVER_STATUS.UNAUTHORIZED:
                    this.despatchInstance(loginError(error.response.statusText));
                    break;
                case SERVER_STATUS.NOT_FOUND:
                    this.despatchInstance(requestError(SERVER_STATUS.NOT_FOUND, error.response.statusText));
                    break;
                case SERVER_STATUS.INTERNAL_SERVER_ERROR:
                    this.despatchInstance(requestError(SERVER_STATUS.INTERNAL_SERVER_ERROR, error.response.statusText));
                    break;
                default:
                    this.despatchInstance(requestError(error.response.status, error.response.statusText));
                    break;
            }
        });
    }

    dispatch(dispatch_) {
        this.despatchInstance = dispatch_;
    }

    get(url, params, callback) {
        _callback = callback;
        this.HTTP.get(url, {params: params});
    }

    post(url, body, callback) {
        _callback = callback;
        this.HTTP.get(url, body);
    }
}();*/
/*HTTP.then((response) => {
    callback(response.data);
    return response;
});
HTTP.catch((error) => {
    //try {
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
});*/

const thenCallback = (response, callback) => {
    callback(response.data);
    return response;
};

const catchCallback = (error, dispatch) => {
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

const HTTPS = new class {

    constructor(){
        this.props.HTTP = axios.create({
            baseURL: getCleanUrl()
        });
    }
    props = {
        HTTP: null,
        dispatch: null
    };
    setDispatch(dispatch) {
        this.props.dispatch = dispatch;
    }
    post(url, body, callback) {
        this.props.HTTP.post(url, body)
            .then((response) => thenCallback(response, callback))
            .catch((reason => catchCallback(reason.response, this.props.dispatch)));
    }

    get(url, params, callback) {
        this.props.HTTP.get(url, {params:params})
            .then((response)=>thenCallback(response,callback))
            .catch(reason => catchCallback(reason.response, this.props.dispatch));
    }
}();

export default HTTPS;