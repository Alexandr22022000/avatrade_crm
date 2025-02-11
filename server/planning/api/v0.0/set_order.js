const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/orders');

module.exports = (app) => {
    app.post('/api/v0.0/planning/order', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();

        let id = req.body.id,
            customer = req.body.customer,
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
            type = req.body.type;

        query(QUERY.SET_ORDER, [id, manager_id, store_id, return_store_id, status, type, description, note, customer, contacts, ready, price, paid, isByBudget])
            .then(() => {
                res.status(200).end();
            })
    });
};