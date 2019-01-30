import HTTPS from "../HTTPS";

export const recoverPass = (token,pass) => (dispatch, getState) =>{
    HTTPS.dispatch = dispatch;
    HTTPS.token = token;
    HTTPS.post('/api/v0.0/recover_password', pass, (response)=> {

    })
};