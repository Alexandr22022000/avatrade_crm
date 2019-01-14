const login = require('./v0.0/login'),
    getPermissions = require('./v0.0/get_permissions');

module.exports = (app) => {
    login(app);
    getPermissions(app);
};