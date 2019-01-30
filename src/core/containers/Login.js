import Login from "../components/Login";
import { connect } from "react-redux";
import loginPost from "../async-actions/loginPost";

export default connect(
  state => ({
    loginInfo: state.status
  }),
  dispatch => ({
    onLogin: (login, password) => {
      console.log(`login: ${login}, pass: ${password}`);
      dispatch(loginPost(login, password));
    }
  })
)(Login);
