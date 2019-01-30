import {connect} from "react-redux";
import PassRecover from "../components/PassRecover";
import {recoverPass} from "../async-actions/recoverPass";

export default connect(
  state => ({
    reqStatus: state.status.requestSuccessful,
    errorStatus: state.status.errorStatus
  }),
  dispatch => ({
    onSendPassword: (token, pass) => {
      console.log("send pass");
      dispatch(recoverPass(token, pass));
    }
  })
)(PassRecover);