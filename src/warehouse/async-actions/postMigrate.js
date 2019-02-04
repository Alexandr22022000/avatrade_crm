import HTTPS from "../../core/HTTPS";

export const postMigrate = (from,to,stocks) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/migrate',{from,to,stocks},dispatch,getState)
        .then(response => {});
};