const get_user = require('./v0.0/get_user'),
    get_users = require('./v0.0/get_users'),
    add_user = require('./v0.0/add_user'),
    set_user = require('./v0.0/set_user'),
    set_user_status = require('./v0.0/set_user_status');

module.exports = (app) => {
    get_user(app);
    get_users(app);
    add_user(app);
    set_user(app);
    set_user_status(app);
};