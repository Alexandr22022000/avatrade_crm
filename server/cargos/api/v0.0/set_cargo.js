const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/cargos');

module.exports = (app) => {
    app.post('/api/v0.0/set_cargo', (req, res) => {
        const user = checkUser(req.body.token);
        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY.SET_CARGO, [req.body.id, req.body.name, req.body.article])
            .then(() => res.status(200).end());
    });
};