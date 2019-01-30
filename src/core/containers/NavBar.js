import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import permissionsGet from "../async-actions/permissionsGet";
import { tokenFound } from "../actions/tokenFound";

export default connect(
  state => ({
    tokenInfo: state.status
  }),
  dispatch => ({
    onPermissionsGet: token => {
      dispatch(permissionsGet(token));
    },
    onTokenDispatch: token => {
      dispatch(tokenFound(token));
    }
  })
)(NavBar);
