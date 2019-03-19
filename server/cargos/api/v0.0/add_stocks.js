const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY = require('../../pSQL/stocks'),
    CAGROS_QUERY = require('../../pSQL/cargos'),
    STORES_QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.post('/api/v0.0/add_stocks', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        if (!checkPermissions(user, [PERMISSIONS.WAREHOUSE_MANAGER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        if (!!req.body.cargo) {
            query(QUERY.INCREASE_STOCKS, [req.body.cargo, req.body.count, 0])
                .then(() => res.status(200).end());
        }
        else {
            const name = req.body.name.trim(),
                article = req.body.article.trim();

            query(CAGROS_QUERY.CHECK_CARGOS, [name, article])
                .then(cargosRequest => {
                    if (cargosRequest.rows.length !== 0) return res.status(409).end();

                    const id = Date.now();
                    query(STORES_QUERY.STORES_GET)
                        .then(({rows}) => {
                            let i = 0;
                            rows.map((item) => {
                                const count = +item.id === 0 ? req.body.count : 0;
                                query(QUERY.ADD_STOCKS, [+item.id + id + 1, id, item.id, count])
                                    .then(() => {
                                        i++;

                                        if (i === rows.length) {
                                            query(CAGROS_QUERY.ADD_CARGOS, [id, name, article])
                                                .then(() => res.status(200).end());
                                        }
                                    });
                            });
                        });
                });
        }
    });
};