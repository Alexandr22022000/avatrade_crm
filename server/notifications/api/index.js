const get_notifications = require('./v0.0/get_notifications'),
    get_pdf = require('./v0.0/get_pdf'),
    create_request_pdf = require('./v0.0/create_request_pdf');

module.exports = (app) => {
    get_notifications(app);
    get_pdf(app);
    create_request_pdf(app);
};