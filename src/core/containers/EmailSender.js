import { connect } from "react-redux";
import EmailSender from "../components/EmailSender";
import { sendEmail } from "../async-actions/sendEmail";

export default connect(
  state => ({
    reqStatus: state.status.requestSuccessful,
    errorStatus: state.status.errorStatus
  }),
  dispatch => ({
    onSendEmail: email => {
      dispatch(sendEmail(email));
    }
  })
)(EmailSender);
