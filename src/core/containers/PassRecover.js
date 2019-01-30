import {connect} from "react-redux";
import PassRecover from "../components/PassRecover";
import {recoverPass} from "../async-actions/recoverPass";

export default connect(
    state=> ({
        reqStatus: state.status.requestSuccessful
    }),
    dispatch => ({
        onSendPassword: (token, pass) => {
            dispatch(recoverPass(token, pass));
        }
    })
)(PassRecover);