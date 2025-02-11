const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/migrations_requests');

module.exports = (app) => {
    app.post('/api/v0.0/migration_request', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.STORE_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        const stocks = {stocks: req.body.stocks};

        query(QUERY.UPDATE_REQUESTS, [req.body.id, req.body.to_id, stocks])
            .then(() => res.status(200).end());
    });
};