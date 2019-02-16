const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/stores');

module.exports = (app) => {
    app.get('/api/v0.0/stores', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        req.query.is_all = req.query.is_all === 'true';
        query(QUERY.STORES_GET, [req.query.is_all])
            .then(({rows}) => res.status(200).json({stores: rows}));
    });
};