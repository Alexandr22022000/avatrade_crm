const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
   QUERY = require('../../pSQL/services');



module.exports = (app) => {
    app.post('/api/v0.0/add_services', (req, res) => {
        let name = req.body.name,
            price = req.body.name,
            is_product = req.body.is_product,
            consumables = {consumables: req.body.consumables};

        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY.ADD_SERVICES, [Date.now(), name, price, is_product, consumables])
            .then(() => res.status(200).end());
    });
};