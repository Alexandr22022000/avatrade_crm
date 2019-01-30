import { SET_CURRENT_USER } from "./types";

export const personResponse = person => {
  return {
    type: SET_CURRENT_USER,
    person
  };
};
