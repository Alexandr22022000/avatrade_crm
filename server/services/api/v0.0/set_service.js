const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERY = require('../../pSQL/services'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.post('/api/v0.0/set_services', (req, res) => {
        let id = req.body.id,
            name = req.body.name,
            price = req.body.name,
            is_product = req.body.is_product,
            consumables = {consumables: req.body.consumables};

        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        query(QUERY.SET_SERVICES, [id, name, price, is_product, consumables])
            .then(() => res.status(200).end());
    });
};