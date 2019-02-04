const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.get('/api/v0.0/stores', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.STORES_GET, )
            .then(({rows}) => res.status(200).json({stores: rows}));
    });
};