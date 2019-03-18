const {login} = require('neuronex-login-backend');

module.exports = (app) => {
    app.post('/api/v0.0/login', (req, res) => {
        if (req.body.password === null) return res.status(401).end();

        login(req.body.login, req.body.password)
            .then((user) => {
                if (!user) return res.status(401).end();

                res.status(200).json({token: user.token, permissions: user.data.permissions});
            });
    });
};
