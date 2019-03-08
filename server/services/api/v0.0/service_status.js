const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    SERVICES_QUERY = require('../../pSQL/services');

module.exports = (app) => {
    app.post('/api/v0.0/services_status', (req, res) => {
      const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(SERVICES_QUERY.SERVICES_STATUS, [req.body.id, req.body.status])
            .then(() => res.status(200).end());
    });
};