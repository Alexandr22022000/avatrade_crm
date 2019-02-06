const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    STOCKS_QUERY = require('../../pSQL/stocks'),
    CARGOS_QUERY = require('../../pSQL/cargos'),
    STORES_QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.post('/api/v0.0/add_store', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        if (!checkPermissions(user, [PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(STORES_QUERY.CHECK_STORE, [req.body.name, req.body.address, null])
            .then(({rows}) => {
                if (rows.length !== 0) return res.status(409).end();

                const id = Date.now();

                query(CARGOS_QUERY.GET_CARGOS)
                    .then((cargos) => {
                        cargos.rows.map((item) => {
                            query(STOCKS_QUERY.ADD_STOCKS, [id + item.id + 1, item.id, id, 0])
                                .then(() => {});
                        });
                    });

                query(STORES_QUERY.ADD_STORE, [id, req.body.name, req.body.address])
                    .then(() => res.status(200).end());
            });
    });
};