const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/payments');

module.exports = (app) => {
    app.post('/api/v0.0/statistic/payment', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        let id = req.body.id,
            value = req.body.paid;

        query(QUERY.SET, [id, value])
            .then(() => res.status(200).end());
    });
};