const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/settings'),
    QUERY_SERVICES = require('../../pSQL/services');

module.exports = (app) => {
    app.get('/api/v0.0/fast_sales', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET, [user.id])
            .then(({rows}) => {
                if (rows.length === 0) return res.status(404).end();

                query(QUERY_SERVICES.GET_SERVICES)
                    .then(services => {
                        rows = rows[0].fast_sales.map(row => {
                            for (let key in services.rows) {
                                if (+row === +services.rows[key].id) {
                                    services.rows[key].consumables = services.rows[key].consumables.consumables;
                                    return services.rows[key];
                                }
                            }
                        });

                        res.status(200).json({fast_sales: rows});
                    });
            });
    });
};