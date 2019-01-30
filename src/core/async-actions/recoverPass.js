import HTTPS from "../HTTPS";
import { acceptPassword } from "../actions/acceptPassword";

export const recoverPass = (token, password) => (dispatch, getState) => {
  HTTPS.dispatch = dispatch;
  HTTPS.token = token;
  HTTPS.post("/api/v0.0/recover_password", password, response => {
    dispatch(acceptPassword());
  });
};
