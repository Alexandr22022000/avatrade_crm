const set_payment = require('./v0.0/set_payment'),
    set_workdays = require('./v0.0/set_workdays'),
    get_statistic = require('./v0.0/get_statistic');

module.exports = (app) => {
    set_payment(app);
    set_workdays(app);
    get_statistic(app);
};