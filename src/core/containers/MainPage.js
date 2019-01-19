import MainPage from '../components/MainPage';
import {connect} from "react-redux";
import permissionsPost from "../async-actions/permissionsPost";
import {tokenFound} from "../actions/tokenFound";

export default connect(
    state => ({
        tokenInfo: state.status
    }),
    dispatch => ({
        onPermissionsGet: (token) => {
            dispatch(permissionsPost(token));
        },
        onTokenDispatch: (token) => {
            dispatch(tokenFound(token));
        }
    })
)(MainPage);