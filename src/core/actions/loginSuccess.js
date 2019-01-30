import { LOGIN_SUCCESS } from "./types";

export const loginSuccess = loginInfo => ({
  type: LOGIN_SUCCESS,
  payload: loginInfo
});
