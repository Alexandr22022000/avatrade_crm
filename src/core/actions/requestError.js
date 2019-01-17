import {REQUEST_ERROR} from "./types";

export const requestError = (errorStatus, errorText) => ({
    type: REQUEST_ERROR,
    error: {errorStatus, errorText}
});