const get_orders = require('./v0.0/get_orders'),
    set_order = require('./v0.0/set_order'),
    add_order = require('./v0.0/add_order');

module.exports = (app) => {
    get_orders(app);
    set_order(app);
    add_order(app);
};