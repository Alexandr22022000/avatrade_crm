const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    QUERY_CARGOS = require('../../pSQL/cargos'),
    QUERY = require('../../pSQL/migrations_requests');

module.exports = (app) => {
    app.get('/api/v0.0/migration_requests', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.STORE_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.OWNER])) return res.status(403).end();

        query(QUERY.GET_REQUESTS)
            .then(({rows}) => {
                query(QUERY_CARGOS.GET_CARGOS, [null])
                    .then(cargos => {
                        rows = rows.map((item) => {
                            item.stocks = item.stocks.stocks.map(item => {
                                for (let key in cargos.rows) {
                                    if (+cargos.rows[key].id === +item.id) {
                                        item.name = cargos.rows[key].name;
                                        item.article = cargos.rows[key].article;
                                        return item;
                                    }
                                }
                            });
                            return item;
                        });

                        res.status(200).json({migration_requests: rows});
                    });
            });
    });
};