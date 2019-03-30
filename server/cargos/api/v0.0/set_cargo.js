const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/workdayes');

module.exports = (app) => {
    app.post('/api/v0.0/set_cargo', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        let id = req.body.id,
            values = req.body.values;

        const descriptions = values.map(item => item.description);
        values = values.map(item => item.value);

        query(QUERY.SET, [id, values, descriptions])
            .then(() => res.status(200).end());
    });
};