const add_stocks = require('./v0.0/add_stocks'),
    get_stocks = require('./v0.0/get_stocks'),
    get_stocks_new = require('./v0.0/get_stocks_new'),
    get_cargos = require('./v0.0/get_cargos'),
    approve_migrate = require('./v0.0/approve_migrate'),
    get_migrations = require('./v0.0/get_migrations'),
    add_migrations_requests = require('./v0.0/add_migrations_requests'),
    set_request = require('./v0.0/set_request'),
    get_request = require('./v0.0/get_request'),
    get_requests = require('./v0.0/get_requests'),
    get_migrate = require('./v0.0/get_migrate'),
    stocks_migrate = require('./v0.0/stocks_migrate'),
    set_cargo = require('./v0.0/set_cargo'),
    set_cargo_status = require('./v0.0/set_cargo_status');

module.exports = (app) => {
    add_stocks(app);
    get_stocks(app);
    get_stocks_new(app);
    get_cargos(app);
    approve_migrate(app);
    get_migrations(app);
    stocks_migrate(app);
    add_migrations_requests(app);
    set_request(app);
    get_request(app);
    get_requests(app);
    get_migrate(app);
    set_cargo(app);
    set_cargo_status(app);
};