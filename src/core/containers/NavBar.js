import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import permissionsGet from "../async-actions/permissionsGet";
import { tokenFound } from "../actions/tokenFound";
import {getStores} from "../../warehouse/async-actions/getStores";
import setCurrentStoreId from "../actions/setCurrentStoreId";

export default connect(
  state => ({
    tokenInfo: state.status,
    migrates: state.status.migrates,
    cargos: state.warehouse.cargos,
      stores: state.warehouse.stores,
      storeId: state.status.storeId,
  }),
  dispatch => ({
    onPermissionsGet: token => {
      dispatch(permissionsGet(token));
    },
    onTokenDispatch: token => {
      dispatch(tokenFound(token));
    },
      onGetStores: () => dispatch(getStores()),
      onSetStoreId: (id) => dispatch(setCurrentStoreId(id)),
  })
)(NavBar);
