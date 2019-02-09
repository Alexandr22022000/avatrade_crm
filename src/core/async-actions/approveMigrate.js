import HTTPS from "../HTTPS";

export const approveMigrate = (id) => (dispatch, getState) =>{
    HTTPS.post('/api/v0.0/approve_migrate',{id}, dispatch, getState)
        .then((response) => {});
};