import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import permissionsGet from "../async-actions/permissionsGet";
import { tokenFound } from "../actions/tokenFound";
import setActiveMigration from "../actions/setActiveMigration";
import {getMigrates} from "../async-actions/getMigrates";
import {approveMigrate} from "../async-actions/approveMigrate";
import {getCargos} from "../../warehouse/async-actions/getCargos";

export default connect(
  state => ({
    tokenInfo: state.status,
    migrates: state.status.migrates,
    cargos: state.warehouse.cargos,
  }),
  dispatch => ({
    onPermissionsGet: token => {
      dispatch(permissionsGet(token));
    },
    onTokenDispatch: token => {
      dispatch(tokenFound(token));
    },

  })
)(NavBar);
