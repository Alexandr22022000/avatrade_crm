import { combineReducers } from "redux";
import status from "./status";
import stuff from "../../personal/reducers/stuff";
import warehouse from '../../warehouse/reducers/warehouse'

export default combineReducers({
  status,
  stuff,
  warehouse
});
