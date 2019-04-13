const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/stocks');

module.exports = (app) => {
    app.get('/api/v0.0/stocks', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        let search = req.query.search;
        if (!search || search.trim() === '' || search === 'null')
            search = null;
        else
            search = "%" + search.trim() + "%";

        let is_del = !req.query.is_del || req.query.is_del === 'false' ? 0 : 1;
        query(QUERY.GET_STOCKS, [search, is_del])
            .then(({rows}) => {
                res.status(200).json({stocks: rows});
            });
    });
};