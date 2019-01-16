import {HTTP} from "../HTTP";
import {SET_LOGIN_INFO, URL} from "../constants";

const loginPost = (login, password) => (dispatch, getState) => {
    HTTP.post(URL + '/api/v0.0/login', {login: login, password: password})
        .then((response)=>{
            dispatch({type: SET_LOGIN_INFO, payload: response.data});
        })
        .catch(reason => {

        })
};

export default loginPost;