const get_user = require('./v0.0/get_user'),
    get_users = require('./v0.0/get_users'),
    add_user = require('./v0.0/add_user'),
    set_user = require('./v0.0/set_user'),
    recover_password = require('./v0.0/recover_password'),
    start_recover_password = require('./v0.0/start_recover_password'),
    set_user_status = require('./v0.0/set_user_status');

module.exports = (app) => {
    get_user(app);
    get_users(app);
    add_user(app);
    set_user(app);
    recover_password(app);
    start_recover_password(app);
    set_user_status(app);
};