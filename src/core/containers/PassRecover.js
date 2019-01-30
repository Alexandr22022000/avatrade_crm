import {connect} from "react-redux";
import PassRecover from "../components/PassRecover";
import recoverPass from "../async-actions/recoverPass";
import goodLoginError from "../actions/goodLoginError";

export default connect(
    state=> ({
        loginError: state.status.loginError,
        requestSuccess: state.status.requestSuccess,
    }),
    dispatch => ({
        onSendPassword: (token, pass) => dispatch(recoverPass(token, pass)),
        setError: (text) => dispatch(goodLoginError(text)),
        cleanErrors: () => dispatch(goodLoginError("")),
    }),
)(PassRecover);