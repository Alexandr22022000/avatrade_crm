const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/migrates');

module.exports = (app) => {
    app.get('/api/v0.0/migrates', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET_MIGRATES)
            .then(({rows}) => {
                rows = rows.map((item) => {
                    item.stocks = item.stocks.stocks;
                    return item;
                });

                res.status(200).json({migrates: rows});
            });
    });
};