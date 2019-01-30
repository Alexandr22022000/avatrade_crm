import Login from '../components/Login';
import {connect} from 'react-redux';
import loginPost from '../async-actions/loginPost';
import goodLoginError from '../actions/goodLoginError';


export default connect(
    state => ({
        loginInfo: state.status
    }),
    dispatch => ({
        onLogin: (login, password) => dispatch(loginPost(login, password)),
        cleanErrors: () => dispatch(goodLoginError("")),
    })
) (Login);