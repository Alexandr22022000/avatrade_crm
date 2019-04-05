const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY_SELLS = require('../../pSQL/sales'),
    QUERY_COLLECTION = require('../../pSQL/collections');

module.exports = (app) => {
    app.post('/api/v0.0/collection', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let store_id = req.body.store_id,
            value = req.body.value;

        query(QUERY_SELLS.STATISTIC_MONEY, [store_id])
            .then(({rows}) => {
                if (rows.length === 0 || rows[0].price +  rows[0].price_resell < value)
                    return res.status(409).end();

                query(QUERY_COLLECTION.ADD, [Date.now(), user.id, store_id, value])
                    .then(() => res.status(200).end());
            });
    });
};