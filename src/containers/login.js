import Login from '../components/login';
import {connect} from 'react-redux';
import loginPost from '../async-actions/loginPost';


export default connect(
    state => ({
        loginInfo: state.login
    }),
    dispatch => ({
        onLogin: (login, password) => {
            dispatch(loginPost(login, password))
        }
    })
) (Login);