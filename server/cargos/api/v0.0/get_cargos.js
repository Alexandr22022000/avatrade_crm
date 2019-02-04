const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/cargos');

module.exports = (app) => {
    app.get('/api/v0.0/cargos', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        let search = req.query.search;
        if (!search || search.trim() === '' || search === 'null')
            search = null;
        else
            search = "%" + search.trim() + "%";

        query(QUERY.GET_CARGOS, [search])
            .then(({rows}) => {
                res.status(200).json({cargos: rows});
            });
    });
};