const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/users'),
    QUERYES_RANKS = require('../../pSQL/ranks'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/user', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERYES.GET_USER, [req.query.id])
            .then(({rows}) => {
                query(QUERYES_RANKS.GET_RANKS)
                    .then(ranks => {
                        res.status(200).json({user: rows[0], ranks: ranks.rows});
                    });
            });
    });
};