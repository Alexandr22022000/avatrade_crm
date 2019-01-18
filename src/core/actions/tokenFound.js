import {TOKEN_FOUND} from "./types";

export const tokenFound = (token) => ({
    type: TOKEN_FOUND,
    payload: token,
});