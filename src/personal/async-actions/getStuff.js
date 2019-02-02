import HTTPS from "../../core/HTTPS";
import {setUsers} from "../actions/setUsers";

export const getStuff = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/users', {is_all: getState().stuff.showAll}, dispatch, getState)
        .then((response) => dispatch(setUsers(response)));
};