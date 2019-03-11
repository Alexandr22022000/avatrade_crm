const get_notifications = require('./v0.0/get_notifications');

module.exports = (app) => {
    get_notifications(app);
};