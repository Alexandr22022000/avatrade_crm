const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY_SERVICES = require('../../pSQL/services'),
    QUERY_SALES = require('../../pSQL/sales'),
    QUERY_STOCKS = require('../../pSQL/stocks');

module.exports = (app) => {
    app.post('/api/v0.0/sale', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let services = req.body.services,
            store = req.body.store,
            is_card = req.body.is_card;

        query(QUERY_SERVICES.GET_SERVICES)
            .then(({rows}) => {
                let price = 0;
                services = services.map(service => {
                    for (let key in rows) {
                        if (+rows[key].id === +service.id) {
                            price += rows[key].price * service.count;
                            return {
                                id: service.id,
                                count: service.count,
                                price: rows[key].price,
                                consumables: rows[key].consumables.consumables,
                            };
                        }
                    }
                });

                query(QUERY_STOCKS.GET_STOCKS_BY_STORE, [store])
                    .then(({rows}) => {
                        let isOk = true;
                        const cargos = rows.map(cargo => ({count: cargo.count, cargo_id: cargo.cargo_id}));

                        services.map(service => {
                           service.consumables.map(consumable => {
                               for (let key in cargos) {
                                   if (+consumable.id === +cargos[key].cargo_id) {
                                       cargos[key].count -= consumable.count * service.count;

                                       if (cargos[key].count < 0) isOk = false;
                                   }
                               }
                           });
                        });

                        if (!isOk) return res.status(409).end();

                        for (let key in cargos) {
                            const decrease = rows[key].count - cargos[key].count;
                            query(QUERY_STOCKS.DECREASE_STOCKS, [rows[key].id, decrease])
                                .then(() => {});
                        }

                        query(QUERY_SALES.ADD_SALE, [Date.now(), user.id, store, {services}, price, is_card])
                            .then(() => res.status(200).end());
                    });
            });
    });
};