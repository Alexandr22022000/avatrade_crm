const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/stocks');

module.exports = (app) => {
    app.get('/api/v0.1/stocks', (req, res) => {
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
                const cargos = [];

                rows.forEach(stock => {
                    let isNew = true;
                    cargos.forEach(cargo => {
                        if (cargo.id === stock.cargo_id) {
                            isNew = false;

                            cargo.stocks.push({
                                count: stock.count,
                                store: stock.store,
                                store_id: stock.store_id,
                            });
                        }
                    });

                    if (isNew) {
                        cargos.push({
                            id: stock.cargo_id,
                            name: stock.name,
                            status: stock.status,
                            article: stock.article,
                            stocks: [{
                                count: stock.count,
                                store_id: stock.store_id,
                                store: stock.store,
                            }],
                        });
                    }
                });

                res.status(200).json({stocks: cargos});
            });
    });
};