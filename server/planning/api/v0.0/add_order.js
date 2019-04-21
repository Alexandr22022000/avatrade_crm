const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/orders');

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
            name = req.body.name,
            description = req.body.description,
            price = req.body.price,
            paid = req.body.paid,
            note = req.body.note,
            status = req.body.status,
            type = req.body.type,
            id = Date.now();

        if(paid === undefined || paid === null || paid.trim() === '' || paid === 'undefined' || paid === 'null')
            paid = 0;

        query(QUERY.ADD_ORDER, [id, manager_id, store_id, return_store_id, status, type, name, description, note, customer, contacts, ready, price, paid])
            .then(() => {
                res.status(200).end();
            })
    })
};