const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/migrates');

module.exports = (app) => {
    app.get('/api/v0.0/migrates', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.STORE_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY.GET_MIGRATE, [req.query.id])
            .then(({rows}) => res.status(200).json({migration_requests: rows}));
    });
};