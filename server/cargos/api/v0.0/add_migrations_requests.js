const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/migrations_requests');

module.exports = (app) => {
    app.post('/api/v0.0/add_migration_request', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.STORE_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        let stocks = req.body.stocks.map(item => ({...item, ready: 0}));
        stocks = {stocks};


        query(QUERY.ADD_REQUESTS, [Date.now(), req.body.to_id, user.id, stocks])
            .then(() => res.status(200).end());
    });
};