const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),

    QUERYES = require('../../pSQL/ranks'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.post('/api/v0.0/users/add_rank', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        const id = Date.now();
        query(QUERYES.ADD_RANK, [id, req.body.name, req.body.payment])
            .then(() => {
                res.status(200).end();
            })
    });
};