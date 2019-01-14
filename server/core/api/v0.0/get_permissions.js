const {checkUser} = require('neuronex-login-backend');

module.exports = (app) => {
    app.post('/api/v0.0/get_permissions', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        res.status(200).json({permissions: user.permissions});
    });
};