const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),

    QUERYES = require('../../pSQL/ranks'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/users/ranks', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        query(QUERYES.GET_RANKS)
            .then(({rows}) => {
               res.status(200).json({ranks: rows});
            });

    });
};