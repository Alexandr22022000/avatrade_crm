import {connect} from "react-redux";
import startRecoverPassword from "../async-actions/startRecoverPassword";
import EmailSender from "../components/EmailSender";
import goodLoginError from "../actions/goodLoginError";

export default connect(
    state=> ({
        loginError: state.status.loginError,
        requestSuccess: state.status.requestSuccess,
    }),
    dispatch => ({
        onSendEmail: (email) => dispatch(startRecoverPassword(email)),
        cleanErrors: () => dispatch(goodLoginError("")),
    })
)(EmailSender);