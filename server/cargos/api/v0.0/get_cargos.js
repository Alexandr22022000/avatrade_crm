const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/cargos');

module.exports = (app) => {
    app.get('/api/v0.0/cargos', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY.GET_CARGOS_ALL)
            .then(({rows}) => {
                res.status(200).json({cargos: rows});
            });
    });
};