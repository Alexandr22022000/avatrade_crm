import HTTPS from "../../core/HTTPS";

const getMigrate = (id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/migrate',{id}, dispatch, getState)
        .then()
};

export default getMigrate;