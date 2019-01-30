import { SET_EMPTY_USER } from "./types";

export const setEmptyCurrentUser = ranks => ({
  type: SET_EMPTY_USER,
  user: {
    user: {
      email: "",
      name: "",
      rank: 0,
      phone: "",
      permissions: [],
      address: "",
      vk: "",
      docs: []
    },
    ranks
  }
});
