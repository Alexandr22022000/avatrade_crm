import { combineReducers } from "redux";
import status from "./status";
import stuff from "../../personal/reducers/stuff";
import warehouse from '../../warehouse/reducers/warehouse';
import storemngmt from '../../storemanagement/reducers/storesmngmt';
import cashbox from '../../cashbox/reducers/cashbox';
import services from '../../services/reducers/services';
import alerts from '../../alerts/reducers/alerts';

export default combineReducers({
  status,
  stuff,
  warehouse,
  storemngmt,
  cashbox,
  services,
  alerts,
});
