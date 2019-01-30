import {GOOD_LOGIN_ERROR} from "./types";

const goodLoginError = (text) => ({
    type: GOOD_LOGIN_ERROR,
    text,
});

export default goodLoginError;