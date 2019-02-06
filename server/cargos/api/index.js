const add_stocks = require('./v0.0/add_stocks'),
    get_stocks = require('./v0.0/get_stocks'),
    get_cargos = require('./v0.0/get_cargos'),
    approve_migrate = require('./v0.0/approve_migrate'),
    get_migrations = require('./v0.0/get_migrations'),
    stocks_migrate = require('./v0.0/stocks_migrate');

module.exports = (app) => {
    add_stocks(app);
    get_stocks(app);
    get_cargos(app);
    approve_migrate(app);
    get_migrations(app);
    stocks_migrate(app);
};