const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    STORES_QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.post('/api/v0.0/store', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(STORES_QUERY.CHECK_STORE, [req.body.name, req.body.address, req.body.id])
            .then(({rows}) => {
                if (rows.length !== 0) return res.status(409).end();

                query(STORES_QUERY.SET_STORE, [req.body.id, req.body.name, req.body.address])
                    .then(() => res.status(200).end());
            });
    });
};