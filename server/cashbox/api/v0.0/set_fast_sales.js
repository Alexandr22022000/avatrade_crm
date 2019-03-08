const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/settings');

module.exports = (app) => {
    app.post('/api/v0.0/fast_services', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let fast_sales = req.body.fast_sales;

        query(QUERY.SET, [user.id, fast_sales])
            .then(() => res.status(200).end());
    });
};