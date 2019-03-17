const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERY = require('../../pSQL/services'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY_CARGOS = require('../../pSQL/cargos');

module.exports = (app) => {
    app.post('/api/v0.0/services', (req, res) => {
        let id = req.body.id,
            name = req.body.name,
            price = req.body.price,
            is_product = req.body.is_product,
            consumables = req.body.consumables;

        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        query(QUERY_CARGOS.GET)
            .then(({rows}) => {
                consumables = consumables.filter(consumable => {
                    for (let key in rows) {
                        if (+rows[key].id === +consumable.id && consumable.count > 0) return true;
                    }

                    return false;
                });

                consumables = {consumables: consumables};

                query(QUERY.SET_SERVICES, [id, name, is_product, price, consumables])
                    .then(() => res.status(200).end());
            });


    });
};