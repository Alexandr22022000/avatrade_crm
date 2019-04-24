const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY_SERVICES = require('../../pSQL/services'),
    QUERY_SALES = require('../../pSQL/sales'),
    QUERY_STOCKS = require('../../pSQL/stocks');

const changeTimezone = (date) => {
    return new Date(date.getTime() - ((date.getTimezoneOffset() / 60) * 60 * 60 * 1000) + 7*60*60*1000);
};

const createNumber = (number, date) => {
    return `${number > 9? (number>99? '': '0') : '00'}${number}.${date.getDate() > 9? '' : '0'}${date.getDate()}.${date.getMonth()>9?'': '0'}${date.getMonth()}.${date.getFullYear()-2000}`;
};


module.exports = (app) => {
    app.post('/api/v0.0/sale', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let services = req.body.services,
            store = req.body.store,
            is_card = req.body.is_card;

        query(QUERY_SERVICES.GET_SERVICES)
            .then(({rows}) => {
                let price = 0, price_resell = 0;
                services = services.map(service => {
                    for (let key in rows) {
                        if (+rows[key].id === +service.id) {
                            if (service.is_resell)
                                price_resell += rows[key].price * service.count;
                            else
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

                        let date = changeTimezone(new Date());
                        let endMonth =  new Date();
                        let beginMonth = new Date();
                        beginMonth.setDate(1);
                        beginMonth.setHours(0);
                        beginMonth.setMinutes(0);
                        beginMonth.setSeconds(0);
                        beginMonth = changeTimezone(beginMonth);
                        endMonth.setMonth(endMonth.getMonth()+1);
                        endMonth.setDate(0);
                        endMonth.setHours(23);
                        endMonth.setMinutes(59);
                        endMonth.setSeconds(59);
                        endMonth = changeTimezone(endMonth);
                        beginMonth = beginMonth.getTime();
                        endMonth = endMonth.getTime();
                        query(QUERY_SALES.COUNT_SALES_BY_MONTH,[beginMonth, endMonth])
                            .then((count)=> {
                                let number = createNumber(+count.rows[0].count+1, date);


                                query(QUERY_SALES.ADD_SALE, [changeTimezone(new Date()).getTime(), user.id, store, {services}, price, price_resell, is_card, number])
                                    .then(() => res.status(200).end());
                            });
                    });
            });
    });
};