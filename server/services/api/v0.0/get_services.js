const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/services'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/services', (req, res) => {
       const user = checkUser(req.query.token);

       if (!user) return res.status(401).end();
       if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

       req.query.is_all = req.query.is_all === 'true';
        query(QUERYES.SERVICES_GET, [req.query.is_all])
            .then(({rows}) => res.status(200).json({services: rows}));
    });
};