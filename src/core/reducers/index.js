import { combineReducers } from "redux";
import status from "./status";
import stuff from "../../personal/reducers/stuff";

export default combineReducers({
  status,
  stuff
});
