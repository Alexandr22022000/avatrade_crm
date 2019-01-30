const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    isOwner = require('../../users/isOwner'),
    QUERYES = require('../../pSQL/users'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.post('/api/v0.0/user', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        isOwner(req.body.id)
            .then((isO) => {
                if (isO) {
                    if (!checkPermissions(user, [PERMISSIONS.OWNER])) return res.status(403).end();

                    let isOk = false;
                    req.body.permissions.map((p) => {
                        if (p === 0) isOk = true;
                    });

                    if (!isOk) return res.status(403).end();
                }

                query(QUERYES.SET_USER, [req.body.id, req.body.email, req.body.permissions, req.body.name, req.body.phone, req.body.vk, req.body.address, req.body.rank, req.body.docs])
                    .then(() => res.status(200).end());
            });
    });
};