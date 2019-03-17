import HTTPS from "../../core/HTTPS";

const createMigrationRequest = (to_id,stocks) => (dispatch, getState) => {
    HTTPS.post('/api/v0.0/add_migrate_request',{to_id,stocks},dispatch,getState)
        .then(response => {});
};

export default createMigrationRequest;