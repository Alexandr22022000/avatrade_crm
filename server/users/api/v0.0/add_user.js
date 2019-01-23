const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/users'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.post('/api/v0.0/add_user', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERYES.ADD_USER, [Date.now(), req.body.email, "0000", req.body.permissions, req.body.name, req.body.phone, req.body.vk, req.body.address, req.body.rank, req.body.docs])
            .then(() => res.status(200).end());
    });
};