const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/services'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/services', (req, res) => {
        let search = req.query.search,
            is_del = req.query.is_del,
            is_product = req.query.is_product;

        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();


        query(QUERYES.SERVICES_GET, [search, is_del, is_product])
            .then(({rows}) => {
                rows = rows.map(item => {item.consumables = item.consumables.consumables; return item;});
                res.status(200).json({services: rows});
            });
    });
};