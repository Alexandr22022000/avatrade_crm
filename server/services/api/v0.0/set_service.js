const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERY = require('../../pSQL/services'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.post('/api/v0.0/set_services', (req, res) => {
        const user = checkUser(req.body.token);

       if (!user) return res.status(401).end();
       if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();


                query(QUERY.SET_SERVICES, [req.body.id, req.body.status])
                    .then(() => res.status(200).end());
                    console.log(res.status(200).end());
    });
};