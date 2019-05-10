const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/users'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/users', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER]))
            query(QUERYES.GET_USERS_NAME_ALL)
                .then(({rows}) => res.status(200).json({users: rows}));
        else
            query(req.query.is_all === 'true' ? QUERYES.GET_USERS_ALL : QUERYES.GET_USERS_WORK)
                .then(({rows}) => res.status(200).json({users: rows}));
    });
};