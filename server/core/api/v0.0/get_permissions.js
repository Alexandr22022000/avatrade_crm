const {checkUser} = require('neuronex-login-backend');

module.exports = (app) => {
    app.get('/api/v0.0/permissions', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        res.status(200).json({permissions: user.permissions, name: user.name});
    });
};