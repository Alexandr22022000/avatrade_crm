const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    QUERYES = require('../../pSQL/services'),
    QUERYES_CARGOS = require('../../pSQL/cargos'),
    PERMISSIONS = require('../../../core/constants/permissions');

module.exports = (app) => {
    app.get('/api/v0.0/services', (req, res) => {
        let search = req.query.search,
            is_del = req.query.is_del,
            is_product = req.query.is_product;

        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        if (is_del === undefined || is_del === null || is_del.trim() === '' || is_del === 'undefined' || is_del === 'null')
            is_del = undefined;
        else
            is_del = is_del === 'true' ? 1 : 0;

        if (is_del === undefined || is_del === null || is_product.trim() === '' || is_product === 'null' || is_product === 'undefined') is_product = undefined;
        if (search && search !== 'null' && search !== 'undefined') search = `%${search}%`;
        else search = undefined;

        query(QUERYES.SERVICES_GET, [search, is_del, is_product])
            .then(({rows}) => {
                query(QUERYES_CARGOS.GET)
                    .then(cargos => {
                        cargos = cargos.rows;
                        rows = rows.map(service => {
                            service.consumables = service.consumables.consumables.map(item => {
                                for (let key in cargos) {
                                    if (+cargos[key].id === +item.id) {
                                        item.name = cargos[key].name;
                                        item.article = cargos[key].article;
                                        return item;
                                    }
                                }
                            });
                            return service;
                        });

                        res.status(200).json({services: rows});
                    });
            });
    });
};