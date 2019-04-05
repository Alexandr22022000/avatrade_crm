const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY_CARGOS = require('../../pSQL/cargos'),
    QUERY = require('../../pSQL/migrates');

module.exports = (app) => {
    app.get('/api/v0.0/migrate', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET_MIGRATE_ONE, [req.query.id])
            .then(({rows}) => {
                query(QUERY_CARGOS.GET_CARGOS)
                    .then(cargos => {
                        if (rows.length === 0) return res.status(404).end();

                        rows[0].stocks = rows[0].stocks.stocks.map(item => {
                            for (let key in cargos.rows) {
                                if (cargos.rows[key].id === item.id) {
                                    item.name = cargos.rows[key].name;
                                    item.article = cargos.rows[key].article;
                                    return item;
                                }
                            }
                        });

                        res.status(200).json(rows[0]);
                    });
            });
    });
};