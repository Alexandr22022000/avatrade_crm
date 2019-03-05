const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    NOTIFICATIONS = require('../../../core/constants/notifications'),
    QUERY_CARGOS = require('../../pSQL/cargos'),
    QUERY_MIGRATES = require('../../pSQL/migrates'),
    QUERY_REQUESTS = require('../../pSQL/requests');

module.exports = (app) => {
    app.get('/api/v0.0/notifications', (req, res) => {
        const user = checkUser(req.query.token);

        if (!user) return res.status(401).end();

        query(QUERY_REQUESTS.GET_REQUESTS)
            .then(requests => {
                query(QUERY_MIGRATES.GET_MIGRATES)
                    .then(migrates => {
                        query(QUERY_CARGOS.GET_CARGOS, [null])
                            .then(cargos => {
                                requests = requests.rows;
                                migrates = migrates.rows;

                                requests = requests.map((item) => {
                                    let text = "На подразделение: " + item.to;
                                    text += "\nЗапросил: " + item.sender;
                                    text += "\nГрузы:\n";

                                    const stocks = item.stocks.stocks.map(item => {
                                        for (let key in cargos.rows) {
                                            if (+cargos.rows[key].id === +item.id) {
                                                return `\t${cargos.rows[key].name} - ${item.count}`;
                                            }
                                        }
                                    });

                                    text += stocks.join('\n');

                                    return {
                                        title: "Запрос на логистику",
                                        text,
                                        type: NOTIFICATIONS.MIGRATION_REQUEST,
                                        id: item.id,
                                    };
                                });

                                migrates = migrates.map((item) => {
                                    let text = "Со склада: " + item.from;
                                    text += "\nНа склад: " + item.to;
                                    text += "\nОтправитель: " + item.sender;
                                    text += "\nГрузы:\n";

                                    const stocks = item.stocks.stocks.map(item => {
                                        for (let key in cargos.rows) {
                                            if (+cargos.rows[key].id === +item.id) {
                                                return `\t${cargos.rows[key].name} - ${item.count}`;
                                            }
                                        }
                                    });

                                    text += stocks.join('\n');

                                    return {
                                        title: "Логистика",
                                        text,
                                        type: NOTIFICATIONS.MIGRATION,
                                        id: item.id,
                                    };
                                });

                                res.status(200).json({notifications: [...requests, ...migrates]});
                            });
                    });
            });
    });
};