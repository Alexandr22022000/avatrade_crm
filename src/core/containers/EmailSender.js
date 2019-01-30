import {connect} from "react-redux";
import {recoverPass} from "../async-actions/recoverPass";
import EmailSender from "../components/EmailSender";

export default connect(
    state=> ({
        reqStatus: state.status.requestSuccessful,
        errorStatus: state.status.errorStatus
    }),
    dispatch => ({
        onSendEmail: (token, email) => {
            console.log('send pass');
            dispatch(recoverPass(token, email));
        }
    })
)(EmailSender);