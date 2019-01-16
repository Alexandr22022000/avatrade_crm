import {combineReducers} from 'redux';
import login from './login';
import permission from './permission'

export default combineReducers({
    login,
    permission
});