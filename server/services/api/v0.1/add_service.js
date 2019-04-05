const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/services'),
    QUERY_CARGOS = require('../../pSQL/cargos');



module.exports = (app) => {
    app.post('/api/v0.1/add_services', (req, res) => {
        let name = req.body.name,
            price = req.body.price,
            is_product = req.body.is_product,
            is_resell = req.body.is_resell,
            consumables = req.body.consumables;

        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY_CARGOS.GET)
            .then(({rows}) => {
                consumables = consumables.filter(consumable => {
                    for (let key in rows) {
                        if (+rows[key].id === +consumable.id && consumable.count > 0) return true;
                    }

                    return false;
                });

                consumables = {consumables: consumables};

                query(QUERY.ADD_SERVICES, [Date.now(), name, is_product, price, consumables, is_resell])
                    .then(() => res.status(200).end());
            });
    });
};