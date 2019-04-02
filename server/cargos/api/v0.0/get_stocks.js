const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/stocks');

module.exports = (app) => {
    app.get('/api/v0.0/stocks', (req, res) => {
        console.log('0');
        const user = checkUser(req.query.token);
        console.log('1');


        if (!user) return res.status(401).end();
        console.log('2');


        let search = req.query.search;
        console.log('3');

        if (!search || search.trim() === '' || search === 'null')
            search = null;
        else
            search = "%" + search.trim() + "%";
        console.log('4');


        let is_del = !req.query.is_del || req.query.is_del === 'false' ? 0 : 1;
        console.log('5');

        query(QUERY.GET_STOCKS, [search, is_del])
            .then(({rows}) => {
                console.log('6');

                res.status(200).json({stocks: rows});
            });
    });
};