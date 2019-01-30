import HTTPS from "../HTTPS";
import {acceptEmail} from "../actions/acceptEmail";

export const sendEmail = (email) => (dispatch, getState)=>{
    HTTPS.dispatch = dispatch;
    HTTPS.post('/api/v0.0/start_recover_password', email, (response) => {
        dispatch(acceptEmail());
    })
};