import HTTPS from "../../core/HTTPS";
import { stuffResponse } from "../actions/stuffResponse";

export const getStuff = is_all => (dispatch, getState) => {
  HTTPS.dispatch = dispatch;
  HTTPS.get("/api/v0.0/users", { is_all }, response => {
    dispatch(stuffResponse(response));
  });
};
