import { combineReducers } from "redux";
import status from "./status";
import stuff from "../../personal/reducers/stuff";
import warehouse from '../../warehouse/reducers/warehouse';
import storemngmt from '../../storemanagement/reducers/storesmngmt';

export default combineReducers({
  status,
  stuff,
  warehouse,
  storemngmt,
});
