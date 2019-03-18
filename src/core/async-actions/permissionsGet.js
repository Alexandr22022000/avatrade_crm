import HTTPS from "../HTTPS";
import { permissionsSuccess } from "../actions/permissionsSuccess";

const permissionsGet = token => (dispatch, getState) => {
  HTTPS.get("/api/v0.0/permissions", {}, dispatch, getState)
      .then((response) => dispatch(permissionsSuccess(response, response.name)));
};

export default permissionsGet;
