const add_sale      = require('./v0.0/add_sale'),
    set_fast_sales  = require('./v0.0/set_fast_sales'),
    get_fast_sales  = require('./v0.0/get_fast_sales'),
    get_sells       = require('./v0.0/get_sells'),
    collection      = require('./v0.0/collection');

module.exports = (app) => {
    add_sale(app);
    set_fast_sales(app);
    get_fast_sales(app);
    collection(app);
    get_sells(app);
};