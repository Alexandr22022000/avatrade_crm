import { LOGIN_ERROR } from "./types";

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
});
