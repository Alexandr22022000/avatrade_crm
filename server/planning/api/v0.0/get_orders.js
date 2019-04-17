const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    QUERY = require('../../pSQL/orders');

module.exports = (app) => {
    app.get('/api/v0.0/planning/orders', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        let start = req.query.start,
            end = req.query.end,
            manager_id = req.query.manager_id,
            store_id = req.query.store_id,
            status = req.query.status,
            type = req.query.type,
            search = req.query.search;

        if(start === undefined || start === null || start.trim() === '' || start === 'undefined' || start === 'null')
            start = undefined;

        if (!search || search.trim() === '' || search === 'null')
            search = null;
        else
            search = "%" + search.trim() + "%";

        if(end === undefined || end === null || end.trim() === '' || end === 'undefined' || end === 'null')
            end = undefined;

        if(manager_id === undefined || manager_id === null || manager_id.trim() === '' || manager_id === 'undefined' || manager_id === 'null')
            manager_id = undefined;

        if(store_id === undefined || store_id === null || store_id.trim() === '' || store_id === 'undefined' || store_id === 'null')
            store_id = undefined;

        if(status === undefined || status === null || status.trim() === '' || status === 'undefined' || status === 'null')
            store_id = undefined;

        if(type === undefined || type === null || type.trim() === '' || type === 'undefined' || type === 'null')
            type = undefined;

        query(QUERY.GET_ORDERS, [start, end, manager_id, store_id, status, type, search])
            .then(({rows}) => {
                res.status(200).json(rows);
            });
    })
};