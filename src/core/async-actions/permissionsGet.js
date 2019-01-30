import HTTPS from "../HTTPS";
import { permissionsSuccess } from "../actions/permissionsSuccess";

const permissionsGet = token => (dispatch, getState) => {
  HTTPS.dispatch = dispatch;
  HTTPS.token = token;
  HTTPS.get("/api/v0.0/permissions", {}, response => {
    dispatch(permissionsSuccess(response));
  });
};

export default permissionsGet;
