const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/migrates');

module.exports = (app) => {
    app.post('/api/v0.0/migrate', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        query(QUERY.ADD_MIGRATE, [Date.now(), req.body.from, req.body.to, {stocks: req.body.stocks}, user.id])
            .then(() => res.status(200).end());
    });
};