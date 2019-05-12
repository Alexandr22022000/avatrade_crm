const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/orders');

const createNumber = (number, date) => {
    return `${number > 9? (number>99? '': '0') : '00'}${number}.${date.getMonth()>9?'': '0'}${date.getMonth()}.${date.getFullYear()-2000}`;
};

module.exports = (app) => {
    app.post('/api/v0.0/planning/add_order', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let customer = req.body.customer,
            contacts = req.body.contacts,
            ready = req.body.ready,
            store_id = req.body.store_id,
            return_store_id = req.body.return_store_id,
            manager_id = req.body.manager_id,
            description = req.body.description,
            price = req.body.price,
            paid = req.body.paid,
            isByBudget = req.body.isByBudget,
            note = req.body.note,
            status = req.body.status,
            type = req.body.type,
            id = Date.now();

        let start = new Date(id),
            end = new Date(id);

        start.setDate(1);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);

        end.setMonth(start.getMonth() + 1);
        end.setDate(1);
        end.setHours(0);
        end.setMinutes(0);
        end.setSeconds(0);

        query(QUERY.GET_ORDERS, [start.getTime(), end.getTime(), null, null, null, null, null])
            .then(({rows}) => {
                let number = createNumber(rows.length + 1, new Date(id));
                query(QUERY.ADD_ORDER, [id, manager_id, store_id, return_store_id, status, type,description, note, customer, contacts, ready, price, paid, isByBudget, number])
                    .then(() => {
                        res.status(200).end();
                    })
            });
    })
};