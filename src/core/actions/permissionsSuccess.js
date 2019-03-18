import { PERMISSIONS_SUCCESS } from "./types";

export const permissionsSuccess = (permissions, name) => ({
  type: PERMISSIONS_SUCCESS,
  payload: permissions.permissions,
  name,
});
