const {checkUser} = require('neuronex-login-backend'),
    calc = require('../../calc'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/statistic', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        let date = req.body.date;
        if (!date) date = Date.now();
        calc(date)
            .then(result => res.status(200).json(result));
    });
};