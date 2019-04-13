const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/orders');

module.exports = (app) => {
    app.post('/api/v0.0/planning/order', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        let id = req.body.id,
            cutomer = req.body.customer,
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
            type = req.body.type;
    });
};