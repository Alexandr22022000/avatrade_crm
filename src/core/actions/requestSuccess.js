import {REQUEST_SUCCESS} from "./types";

const requestSuccess = (isSuccess = true) => ({
    type: REQUEST_SUCCESS,
    isSuccess,
});

export default requestSuccess;