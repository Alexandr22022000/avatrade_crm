const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    STORES_QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.post('/api/v0.0/store_status', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();
        if (+req.body.id === 0) return res.status(409).end();

        query(STORES_QUERY.SET_STORE_STATE, [req.body.id, req.body.status])
            .then(() => res.status(200).end());
    });
};