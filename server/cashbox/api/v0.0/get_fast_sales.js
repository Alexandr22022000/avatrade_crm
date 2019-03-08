const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/settings'),
    QUERY_CARGOS = require('../../pSQL/cargos'),
    QUERY_SERVICES = require('../../pSQL/services');

module.exports = (app) => {
    app.get('/api/v0.0/fast_services', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET, [user.id])
            .then(({rows}) => {
                if (rows.length === 0) return res.status(404).end();
                query(QUERY_SERVICES.GET_SERVICES)
                    .then(services => {
                        services = services.rows;

                        query(QUERY_CARGOS.GET)
                            .then(cargos => {
                                cargos = cargos.rows;

                                rows = rows[0].fast_sales.map(row => {
                                    for (let key in services) {
                                        if (+row === +services[key].id) {
                                            services[key].consumables = services[key].consumables.consumables.map(item => {
                                                for (let key in cargos) {
                                                    if (+cargos[key].id === +item.id) {
                                                        item.name = cargos[key].name;
                                                        item.article = cargos[key].article;
                                                        return item;
                                                    }
                                                }
                                            });
                                            return services[key];
                                        }
                                    }
                                });

                                res.status(200).json({fast_sales: rows});
                            });
                    });
            });
    });
};