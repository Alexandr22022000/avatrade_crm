const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/migrates'),
    STOCKS_QUERY = require('../../pSQL/stocks');

module.exports = (app) => {
    app.post('/api/v0.0/approve_migrate', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET_MIGRATE, [req.body.id])
            .then(({rows}) => {
                if (rows.length === 0) return res.status(404).end();

                let checked = 0,
                    isOk = true;

                rows[0].stocks.stocks.map((item) => {
                    query(STOCKS_QUERY.CHECK_STOCK, [item.id, rows[0].from_id, item.count])
                        .then(request => {
                            checked++;
                            if (request.rows.length === 0) isOk = false;

                            if (checked === rows[0].stocks.stocks.length) {
                                if (!isOk) return res.status(409).end();

                                rows[0].stocks.stocks.map((item) => {
                                    query(STOCKS_QUERY.INCREASE_STOCKS, [item.id, item.count, rows[0].to_id])
                                        .then(() => {});

                                    query(STOCKS_QUERY.INCREASE_STOCKS, [item.id, item.count * -1, rows[0].from_id])
                                        .then(() => {});
                                });

                                query(QUERY.APPROVE_MIGRATE, [req.body.id, user.id])
                                    .then(() => res.status(200).end());
                            }
                        });
                });
            });
    });
};