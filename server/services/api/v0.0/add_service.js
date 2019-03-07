const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
   QUERY = require('../../pSQL/services');



module.exports = (app) => {
    app.post('/api/v0.0/add_services', (req, res) => {
        const user = checkUser(req.body.token);

       if (!user) return res.status(401).end();

        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY.CHECK_SERVICES, [req.body.name, req.body.price, req.body.is_product, req.body.consumables])
            .then(({rows}) => {
                if (rows.length !== 0) return res.status(409).end();

                const id = Date.now();
                query(QUERY.ADD_SERVICES, [id, req.body.name, req.body.price, req.body.is_product, req.body.consumables])
                    .then(() => res.status(200).end());
                console.log(res.status(200).end());

            });
    });
};