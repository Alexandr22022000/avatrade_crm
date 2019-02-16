const get_stores = require('./v0.0/get_stores'),
    set_store = require('./v0.0/set_store'),
    set_state = require('./v0.0/set_store_status'),
    add_stores = require('./v0.0/add_store');

module.exports = (app) => {
    get_stores(app);
    set_store(app);
    add_stores(app);
    set_state(app);
};