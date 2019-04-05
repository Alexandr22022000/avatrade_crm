const {query} = require('neuronex-pg');

module.exports = (start, end) => {
    return new Promise((resolve, reject) => {
        const data = {
            collections: [],
            sells: [],
            user_sells: [],
            oldSells: null,
            oldCollections: null,
            stores: null,
            users: null,
            workdays: null,
            increase_kpi: null,
            decrease_kpi: null,
            payments: null,
            inactiveUsers: null,
        };

        let requests = 0, responses = 0;
        const callback = (i, fun) => {
            requests++;
            return (dataL, err) => {
                fun(dataL, err, i);
                responses++;
                if (requests === responses) resolve(data);
            }
        };

        let startLoop = new Date(start.getTime()),
            endLoop = new Date(start.getTime());
        endLoop.setDate(3);

        let i = 1;
        while (endLoop.getTime() <= end.getTime()) {
            let startD = startLoop.getTime(),
                endD = endLoop.getTime();

            query('SELECT SUM(sales.price) AS price, SUM(sales.price_resell) AS price_resell, sales.store_id, sales.is_card, stores.name FROM sales JOIN stores ON sales.store_id = stores.id WHERE sales.id >= $1 AND sales.id < $2 GROUP BY sales.store_id, sales.is_card, stores.name', [startD, endD])
                .then(callback(i, ({rows}, err, i) => {
                    data.sells.push({
                        day: i,
                        values: rows,
                    });
                }));

            query('SELECT SUM(cashbox_collection.value) AS value, cashbox_collection.store_id, stores.name FROM cashbox_collection JOIN stores ON cashbox_collection.store_id = stores.id WHERE cashbox_collection.id >= $1 AND cashbox_collection.id < $2 GROUP BY cashbox_collection.store_id, stores.name', [startD, endD])
                .then(callback(i, ({rows}, err, i) => {
                    data.collections.push({
                        day: i,
                        values: rows,
                    });
                }));

            query('SELECT SUM(sales.price) AS price, SUM(sales.price_resell) AS price_resell, sales.user_id, users.name FROM sales JOIN users ON sales.user_id = users.id WHERE sales.id >= $1 AND sales.id < $2 GROUP BY sales.user_id, users.name', [startD, endD])
                .then(callback(i, ({rows}, err, i) => {
                    data.user_sells.push({
                        day: i,
                        values: rows,
                    });
                }));

            startLoop.setDate(startLoop.getDate() + 1);
            endLoop.setDate(endLoop.getDate() + 1);
            i++;
        }

        let startD = start.getTime(),
            endD = end.getTime();

        query('SELECT SUM(price) AS price, SUM(price_resell) AS price_resell, store_id FROM sales WHERE id < $1 AND is_card = false GROUP BY store_id', [startD])
            .then(callback(null, ({rows}) => {
                data.oldSells = rows;
            }));

        query('SELECT SUM(value) AS value, store_id FROM cashbox_collection WHERE id < $1 GROUP BY store_id', [startD])
            .then(callback(null, ({rows}) => {
                data.oldCollections = rows;
            }));

        query('SELECT users.id, users.name, users.status, ranks.payment FROM users JOIN ranks ON users.rank = ranks.id WHERE users.id < $1 ', [endD])
            .then(callback(null, ({rows}) => {
                data.users = rows.filter(item => item.status === 0);
                data.inactiveUsers = rows.filter(item => item.status === 1);
            }));

        query('SELECT id, name FROM stores WHERE status = 0 AND id < $1', [endD])
            .then(callback(null, ({rows}) => {
                data.stores = rows;
            }));

        query('SELECT workdays.id, workdays.user_id, workdays.calendar, workdays.values, workdays.descriptions, users.name FROM workdays JOIN users ON workdays.user_id = users.id WHERE workdays.date >= $1 AND workdays.date < $2', [startD, endD])
            .then(callback(null, ({rows}) => {
                data.workdays = rows.filter((item) => item.calendar === 0);
                data.increase_kpi = rows.filter((item) => item.calendar === 3);
                data.decrease_kpi = rows.filter((item) => item.calendar === 4);
            }));

        query('SELECT payments.id, payments.user_id, payments.value, users.name FROM payments JOIN users ON payments.user_id = users.id WHERE payments.date >= $1 AND payments.date < $2', [startD, endD])
            .then(callback(null, ({rows}) => {
                data.payments = rows;
            }));
    });
};